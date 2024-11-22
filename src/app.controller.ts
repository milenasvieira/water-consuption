import { Controller, Get, Param, ParseFloatPipe, NotFoundException } from '@nestjs/common';

@Controller('temperatura')
export class AppController {
  @Get(':valor/:deEscala/:paraEscala')
  convertTemperature(
    @Param('valor', ParseFloatPipe) valor: number,
    @Param('deEscala') deEscala: string,
    @Param('paraEscala') paraEscala: string,
  ): string {
    const de = deEscala.toUpperCase();
    const para = paraEscala.toUpperCase();

    if (!['C', 'F', 'K'].includes(de) || !['C', 'F', 'K'].includes(para)) {
      throw new NotFoundException('Escala de temperatura inválida. Use C, F ou K.');
    }

    let valorConvertido: number;

    if (de === 'C') {
      valorConvertido = this.converterCelsius(valor, para);
    } else if (de === 'F') {
      valorConvertido = this.converterFahrenheit(valor, para);
    } else if (de === 'K') {
      valorConvertido = this.converterKelvin(valor, para);
    }

    return `A temperatura ${valor}° ${de} convertida é ${valorConvertido.toFixed(2)}° ${para}`;
  }

  private converterCelsius(valor: number, para: string): number {
    if (para === 'F') return (valor * 9) / 5 + 32;
    if (para === 'K') return valor + 273.15;
    return valor;
  }

  private converterFahrenheit(valor: number, para: string): number {
    if (para === 'C') return ((valor - 32) * 5) / 9;
    if (para === 'K') return ((valor - 32) * 5) / 9 + 273.15;
    return valor;
  }

  private converterKelvin(valor: number, para: string): number {
    if (para === 'C') return valor - 273.15;
    if (para === 'F') return ((valor - 273.15) * 9) / 5 + 32;
    return valor;
  }
}

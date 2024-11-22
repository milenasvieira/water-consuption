import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ConsumoAguaService } from './consumo-agua.service';
import { Consumer } from './consumo-agua.model';

@Controller('consumo-agua')
export class ConsumoAguaController {
    constructor(private readonly consumoAguaService: ConsumoAguaService) {}

    @Get()
    readAllConsumers(): Promise<any> {
        return this.consumoAguaService.readAllConsumers();
    }

    @Get(':consumerId')
    readConsumerBills(@Param('consumerId') consumerId: string): Promise<any> {
        return this.consumoAguaService.readConsumerBills(consumerId);
    }

    @Get(':consumerId/:startDate/:endDate')
    readSelectedDates(@Param('consumerId') consumerId: string, @Param('startDate') startDate: Date, @Param('endDate') endDate: Date): Promise<any> {
        return this.consumoAguaService.readSelectedDates(consumerId, startDate, endDate);
    }

    @Get(':consumerId')
    updateConsumer(@Body() consumer: Consumer): Promise<any> {
        return this.consumoAguaService.updateConsumer(consumer);
    }

    @Get(':consumerId')
    deleteConsumer(@Param('id') id: string): Promise<any> {
        return this.consumoAguaService.deleteConsumer(id);
    }

    @Get('/consumptionalert/:consumerId')
    highConsumption(@Param('consumerId') consumerId: string): Promise<any> {
        return this.consumoAguaService.highConsumption(consumerId);
    }

    @Post()
    createConsumer(@Body() consumer: Consumer): Promise<any> {
        return this.consumoAguaService.createConsumer(consumer);
    }

}

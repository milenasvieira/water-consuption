import { Module } from '@nestjs/common';
import { ConsumoAguaController } from './consumo-agua.controller';
import { ConsumoAguaService } from './consumo-agua.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WaterConsumptionSchema } from './consumo-agua.model';


@Module({
  imports: [MongooseModule.forFeature([{name: 'Consumer', schema: WaterConsumptionSchema }])],
  controllers: [ConsumoAguaController],
  providers: [ConsumoAguaService]
})
export class ConsumoAguaModule {}

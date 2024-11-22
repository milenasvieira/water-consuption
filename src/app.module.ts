import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumoAguaModule } from './consumo-agua/consumo-agua.module';

@Module({
  imports: [ConsumoAguaModule, MongooseModule.forRoot('mongodb+srv://<username>:<password>@cluster-wb.eiarf.mongodb.net/webmobile?retryWrites=true&w=majority&appName=cluster-wb'), ConsumoAguaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consumer } from './consumo-agua.model';

@Injectable()
export class ConsumoAguaService {
    constructor (@InjectModel('Consumer') private readonly consumerModel: Model<Consumer>) {}

    async createConsumer(consumer: Consumer) {
        const newConsumer = new this.consumerModel({
            consumerId: consumer.consumerId, 
            date: consumer.date, 
            waterConsumed: consumer.waterConsumed
        });
        const result = await newConsumer.save();
        return result.id as string;
    }

    async readAllConsumers() {
        const consumers = await this.consumerModel.find().exec();
        return consumers
    }

    async readConsumerBills(consumerId: string) {
        const consumerBills = await this.consumerModel.findById(consumerId).exec();
        return consumerBills
    }

    async readSelectedDates(consumerId: string, startDate: Date, endDate: Date) {
        const selectedDates = await this.consumerModel.find({consumerId: consumerId, date: {$gte: startDate, $lte: endDate}}).exec();
        return selectedDates
    }

    async updateConsumer(consumer: Consumer) {
        const updatedConsumer = await this.consumerModel.findOne({ consumer: consumer.consumerId }).exec();
        if (consumer.consumerId) {
            updatedConsumer.consumerId = consumer.consumerId;
        }

        if (consumer.date) {
            updatedConsumer.date = consumer.date;
        }

        if (consumer.waterConsumed) {
            updatedConsumer.waterConsumed = consumer.waterConsumed;
        }

        updatedConsumer.save();
    }

    async deleteConsumer(consumerId: string) {
        const deletedConsumer = await this.consumerModel.deleteOne({_id: consumerId});
        return deletedConsumer
    }

    async highConsumption(consumerId: string) {
        const now = new Date();
        const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
        if (isNaN(currentMonth.getTime()) || isNaN(lastMonth.getTime())) {
            throw new Error('Datas inválidas.');
        }

        const lastMonthConsumption = await this.consumerModel
            .findOne({
                consumerId,
                date: { $gte: lastMonth, $lt: currentMonth }
            })
            .exec();

        if (!lastMonthConsumption) {
            return null;
        }

        const currentMonthConsumption = await this.consumerModel
            .findOne({
                consumerId,
                date: { $gte: currentMonth }
            })
            .exec();
            
        if (!currentMonthConsumption) {
            return null;
        }

        if (currentMonthConsumption.waterConsumed > lastMonthConsumption.waterConsumed) {
            return alert("ALERTA! O seu consumo de água está alto! O consumo deste mês é maior que o do mês passado.");
        }

        return null;
    }
}

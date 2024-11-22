import * as mongoose from 'mongoose';

export const WaterConsumptionSchema = new mongoose.Schema({
    consumerId: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
    waterConsumed: {type: Number, required: true},
});

export interface Consumer extends mongoose.Document {
    consumerId: string;
    date: Date;
    waterConsumed: number;
}
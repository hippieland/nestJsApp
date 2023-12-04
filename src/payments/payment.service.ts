import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentModel } from './payment.model';

@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<Payment>) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }

  async findOneById(id: string): Promise<Payment | null> {
    return this.paymentModel.findById(id).exec();
  }

  async create(payment: Payment): Promise<Payment> {
    const newPayment = new this.paymentModel(payment);
    return newPayment.save();
  }

  async update(id: string, payment: Payment): Promise<Payment | null> {
    return this.paymentModel.findByIdAndUpdate(id, payment, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.paymentModel.findByIdAndDelete(id).exec();
  }
}

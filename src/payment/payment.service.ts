import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Between, Repository } from 'typeorm';
import { GetPaymentByDate } from './dto/get-payment-by-date.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>
  ) { }

  async existTransaction(id: string) {
    try {
      const payment = await this.paymentRepo.findOne({
        where: { id }
      })
      return payment.id
    } catch (error) {
      return error.message
    }
  }

  async findAllTransactionBy(
    type: string, 
    getDate:GetPaymentByDate
    ) {
    try {
      const {from, to} = getDate;
      return await this.paymentRepo.find({
          where: {
            type, 
            date: Between(from, to)
          },
          order:{
            date: "ASC"
          }
      });
    } catch (error) {
      return error
    }
  }

  async createTransaction(createPaymentDto: CreatePaymentDto) {
    try {
      const newPayment = new Payment({
        ...createPaymentDto
      })
      await this.paymentRepo.save(newPayment)
    } catch (error) {
      return error
    }
  }

  async removeTransaction(id: string) {
    try {
      await this.paymentRepo.delete(id)
    } catch (error) {
      throw new NotFoundException(`Order not found`)
    }
  }
}

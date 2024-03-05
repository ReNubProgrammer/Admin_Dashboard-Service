import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { GetPaymentByDate } from './dto/get-payment-by-date.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('new')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createTransaction(createPaymentDto);
  }

  @Get('all/:type')
  findBy(
    @Param('type') type:string, 
    @Query() query: GetPaymentByDate
    ) {
    return this.paymentService.findAllTransactionBy(
      type, 
      query
    );
  }

  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.paymentService.existTransaction(id);
  }

  @Delete('drop/:id')
  remove(@Param('id') id: string) {
    return this.paymentService.removeTransaction(id);
  }
}

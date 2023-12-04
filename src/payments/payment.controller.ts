import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Payment } from './payment.model';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentService.findOneById(id);
  }

  @Post()
  create(@Body() payment: Payment): Promise<Payment> {
    return this.paymentService.create(payment);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payment: Payment): Promise<Payment | null> {
    return this.paymentService.update(id, payment);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.paymentService.delete(id);
  }
}

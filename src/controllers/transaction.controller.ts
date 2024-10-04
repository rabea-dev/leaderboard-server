import {Controller, Get, Param, Post, Body, Put, Delete, Query} from '@nestjs/common';
import {TransactionService} from "../services/transaction.service";
import {TransactionDto} from "../models/transaction";

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTarget(@Body() transactionDto: TransactionDto) {
    return await this.transactionService.createTransaction(transactionDto);
  }
  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    return await this.transactionService.getTransaction(id);
  }

  @Get('exact-date-range')
  async getTargetByExactDateRange(@Query('date') date: string) {
    return await this.transactionService.getTransactionsByDateRange(date);
  }

  @Put(':id')
  async updateTarget(@Param('id') id: string, @Body() transactionDto: TransactionDto) {
    await this.transactionService.updateTransaction(id, transactionDto);
    return { message: `Target with ID ${id} has been updated` };
  }

  @Delete(':id')
  async deleteTarget(@Param('id') id: string) {
    await this.transactionService.deleteTransaction(id);
    return { message: `Transaction with ID ${id} has been deleted` };
  }
}

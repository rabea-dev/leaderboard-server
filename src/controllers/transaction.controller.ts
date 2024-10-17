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

  @Get('exact-date-range')
  async getTargetByExactDateRange(@Query('date') date: string,@Query('officeId') officeId: string) {
    return await this.transactionService.getTransactionsByDateRange(date,officeId);
  }
  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    return await this.transactionService.getTransaction(id);
  }

  @Get()
  async getTransactions(@Query('officeId') officeId?: string) {
    if (officeId) {
      return await this.transactionService.getTransactionByOffice(officeId); // Filter by officeId if query param is provided
    }
    return await this.transactionService.getAllTransactions(); // Return all employees if no query param is provided
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

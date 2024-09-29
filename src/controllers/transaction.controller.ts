import {Body, Controller, Post} from '@nestjs/common';
import {TransactionService} from "../services/transaction.service";
import {TransactionDto} from "../models/transaction";

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(@Body() transactionDto: TransactionDto) {
    return await this.transactionService.createTransaction(transactionDto);
  }
}

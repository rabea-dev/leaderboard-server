import {Injectable} from '@nestjs/common';
import {Transaction, TransactionDto} from "../models/transaction";
import {generateUniqueString} from "../string.utils";

@Injectable()
export class TransactionService {
    async createTransaction(transactionDto: TransactionDto) {
        const transaction: Transaction = {
            id: generateUniqueString(),
            ...transactionDto
        };
        return {
            message: 'Transaction created successfully',
            transaction
        }
    }
}

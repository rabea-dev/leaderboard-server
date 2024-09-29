export interface TransactionDto {
    employeeId: string;
    depositAmount: number;
    date: string;
}

export interface Transaction extends TransactionDto {
    id: string;
}

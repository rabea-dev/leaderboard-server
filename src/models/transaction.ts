export interface TransactionDto {
    employeeId: string;
    depositAmount: number;
    date: string;
    officeId: string;
}

export interface Transaction extends TransactionDto {
    id: string;
}

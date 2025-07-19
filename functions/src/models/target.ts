export interface TargetDto {
    amount: number;
    from: string;
    to: string;
    employeeId: string;
    officeId: string;
}

export interface Target extends TargetDto {
    id: string;
}

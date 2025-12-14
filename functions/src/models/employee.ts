export interface EmployeeDto {
    name: string;
    birthDate: string;
    officeId: string;
    isDeactivated?: boolean;
}

export interface Employee extends EmployeeDto {
    id: string;
}

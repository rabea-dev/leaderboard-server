export interface EmployeeDto {
    name: string;
    birthDate: string;
    officeId: string;
}

export interface Employee extends EmployeeDto {
    id: string;
}

export interface AdminDto {
    name: string;
    officeId: string;
}

export interface Admin extends AdminDto {
    id: string;
}

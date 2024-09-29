import {Injectable} from '@nestjs/common';
import {Admin, AdminDto} from "../models/admin";
import {generateUniqueString} from "../string.utils";

@Injectable()
export class AdminService {
    
    async createAdmin(adminDto: AdminDto) {
        const admin: Admin = {
            id: generateUniqueString(),
            ...adminDto
        };
        return {
            message: 'Admin created successfully',
            admin: admin
        }
    }
}

import {Office, OfficeDto} from "../models/office";
import {generateUniqueString} from "../string.utils";

export class OfficeService {
    async createOffice(officeDto: OfficeDto) {
        const office: Office = {
            id: generateUniqueString(),
            ...officeDto
        };
        return {
            message: 'Office created successfully',
            office
        }
    }

    async getOffices(): Promise<Office[]> {
        return Promise.resolve(
            [{id: '1', name: 'Sakhnin'}, {id: '2', name: 'Cairo'}, {id: '3', name: 'Jenin'}]
        );
    }
}

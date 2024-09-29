import {Injectable} from '@nestjs/common';
import {Target, TargetDto} from "../models/target";
import {generateUniqueString} from "../string.utils";

@Injectable()
export class TargetService {
    async createTarget(targetDto: TargetDto) {
        const target: Target = {
            id: generateUniqueString(),
            ...targetDto
        };
        return {
            message: 'Target created successfully',
            target
        }
    }
}

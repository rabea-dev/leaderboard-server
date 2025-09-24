import {Controller, Get, Param, Post, Body, Put, Delete, Query} from '@nestjs/common';
import {PromotionDto} from "../models/promotion";
import {PromotionService} from "../services/promotion.service";

@Controller('promotion')
export class PromotionController {
    constructor(private readonly promotionService: PromotionService = new PromotionService()) {
    }

    @Post()
    async createPromotion(@Body() promotionDto: PromotionDto) {
        return await this.promotionService.createPromotion(promotionDto);
    }

    @Get('exact-date-range')
    async getPromotionByExactDateRange(@Query('date') date: string, @Query('officeId') officeId: string) {
        return await this.promotionService.getPromotionsByDateRange(date, officeId);
    }

    @Get()
    async getPromotions(@Query('officeId') officeId: string) {
        if (officeId) {
            return await this.promotionService.getPromotionByOfficeId(officeId); // Filter by officeId if query param is provided
        }
        return await this.promotionService.getAllPromotions(); // Return all employees if no query param is provided
    }

    @Get(':id')
    async getPromotion(@Param('id') id: string) {
        return await this.promotionService.getPromotion(id);
    }

    @Put(':id')
    async updatePromotion(@Param('id') id: string, @Body() promotionDto: PromotionDto) {
        await this.promotionService.updatePromotion(id, promotionDto);
        return {message: `Promotion with ID ${id} has been updated`};
    }

    @Delete(':id')
    async deletePromotion(@Param('id') id: string) {
        await this.promotionService.deletePromotion(id);
        return {message: `Promotion with ID ${id} has been deleted`};
    }
}

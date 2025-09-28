import { OwnersService } from "../services/owners.service";
import { Controller, Get, Param, Query } from "@nestjs/common";

@Controller('users/owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) { }

    @Get('profit')
    public calculateOwnersProfit() {
        return this.ownersService.calculateOwnersProfit();
    }

    @Get('expenses')
    public calculateOwnerExpenses() {
        return this.ownersService.calculateOwnerExpenses();
    }

    @Get('commission')
    public calculateEmployeeCommission() {
        // return this.ownersService.calculateEmployeeCommission();
    }
}
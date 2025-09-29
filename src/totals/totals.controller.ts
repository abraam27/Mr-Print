import { Controller, Get, Query } from '@nestjs/common';
import { GetReportService } from './services/get-report.service ';

@Controller('report')
export class TotalsController {
  constructor(private readonly getReportService: GetReportService) {}

  @Get('')
  generateReport(@Query('month') month: string, @Query('year') year: string) {
    return this.getReportService.getReport(Number(month), Number(year));
  }
}

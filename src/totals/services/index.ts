import { GetCustomerTotalsService } from './get-customer-totals.service';
import { GetEmployeeTotalsService } from './get-employee-totals.service.';
import { GetOwnerTotalsService } from './get-owner-totals.service';
import { GetReportService } from './get-report.service ';
import { GetTotalsService } from './get-totals.service';

export const TotalsServices = [
  GetCustomerTotalsService,
  GetOwnerTotalsService,
  GetEmployeeTotalsService,
  GetReportService,
  GetTotalsService,
];

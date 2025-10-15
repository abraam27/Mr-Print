import { WorkType } from './attendance-logs.enums';

export const EmployeeShiftCostMap: Record<WorkType, number> = {
  [WorkType.Shift]: 150,
  [WorkType.Overtime]: 50,
};

export const OwnerShiftCostMap: Record<WorkType, number> = {
  [WorkType.Shift]: 150,
  [WorkType.Overtime]: 50,
};

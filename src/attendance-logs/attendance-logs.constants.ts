import { WorkType } from './attendance-logs.enums';

export const EmployeeShiftCostMap: Record<WorkType, number> = {
  [WorkType.Shift]: 150,
  [WorkType.NightShift]: 200,
  [WorkType.ShiftPlusNightShift]: 350,
  [WorkType.DoubleShift]: 300,
  [WorkType.TripleShift]: 500,
  [WorkType.Overtime]: 50,
};

export const OwnerShiftCostMap: Record<WorkType, number> = {
  [WorkType.Shift]: 100,
  [WorkType.NightShift]: 150,
  [WorkType.ShiftPlusNightShift]: 250,
  [WorkType.DoubleShift]: 200,
  [WorkType.TripleShift]: 350,
  [WorkType.Overtime]: 50,
};
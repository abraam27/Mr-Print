import { WorkType } from './attendance-logs.enums';

export const ShiftCostMap: Record<WorkType, number> = {
  [WorkType.HalfShift]: 75,
  [WorkType.Shift]: 150,
  [WorkType.DoubleShift]: 300,
  [WorkType.tripleShift]: 450,
  [WorkType.OverTime]: 50,
};

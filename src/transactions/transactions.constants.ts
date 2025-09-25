import { PaperType } from './transactions.enums';

export const PaperCostMap: Record<PaperType, number> = {
  [PaperType.A3]: 0.9,
  [PaperType.A4]: 0.3,
};

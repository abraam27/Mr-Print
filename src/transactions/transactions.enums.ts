export enum PaperType {
  A3 = 'A3',
  A4 = 'A4',
}

export const PaperCostMap: Record<PaperType, number> = {
  [PaperType.A3]: 0.9,
  [PaperType.A4]: 0.3,
};

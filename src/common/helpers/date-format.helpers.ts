/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateTime } from 'luxon';

export function formatDate(date: string | Date): string {
  return DateTime.fromISO(date.toString(), { zone: 'utc' }).toFormat(
    'd/M/yyyy',
  );
}

export function getWeekday(dateStr: string): string {
  const [day, month, year] = dateStr.split('/').map(Number);
  return DateTime.fromObject({ day, month, year }).toFormat('EEEE');
}

export function filterLogsByMonthYear(
  logs: any[],
  month: number,
  year: number,
) {
  return logs.filter((log) => {
    const [day, m, y] = log.date.split('/').map(Number);
    return m === month && y === year;
  });
}

import { DateTime } from 'luxon';

export function getWeekday(dateIso: string): string {
    return DateTime.fromISO(dateIso, { zone: 'utc' }).toFormat('EEEE');
}
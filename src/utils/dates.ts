import dayjs, { type Dayjs } from 'dayjs';
import type { DateType } from 'react-native-ui-datepicker';

export const DATE_KEY_FORMAT = 'YYYY-MM-DD';

export function formatDateForDatabase(value: DateType): string {
  if (value == null) {
    throw new Error('Date is required');
  }
  return dayjs(value as string | Date | Dayjs).format(DATE_KEY_FORMAT);
}

export function toDateKey(value: string | Date | Dayjs): string {
  return dayjs(value).format(DATE_KEY_FORMAT);
}

export function isSameCalendarDay(
  a: string | Date | Dayjs,
  b: string | Date | Dayjs,
): boolean {
  return toDateKey(a) === toDateKey(b);
}

const DAYS_BEFORE = 14;
const DAYS_AFTER = 74;

export function buildScrollableCalendarDays(anchor = dayjs()): Dayjs[] {
  const start = anchor.subtract(DAYS_BEFORE, 'day');
  const total = DAYS_BEFORE + DAYS_AFTER + 1;
  return Array.from({ length: total }, (_, index) => start.add(index, 'day'));
}

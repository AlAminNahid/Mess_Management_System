export function formatDateInBangladesh(date: Date): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(date));

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  return `${year}-${month}-${day}`;
}

export function currentDateInBangladesh(): string {
  return formatDateInBangladesh(new Date());
}

export function currentMonthInBangladesh(): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;

  return `${year}-${month}`;
}

// Bangladesh has a fixed UTC+6 offset (no DST), so the current month's
// boundaries in Asia/Dhaka can be computed directly as UTC instants.
export function getCurrentBangladeshMonthRange(): { start: Date; end: Date } {
  const [year, month] = currentMonthInBangladesh().split('-').map(Number);
  const start = new Date(Date.UTC(year, month - 1, 1, -6));
  const end = new Date(Date.UTC(year, month, 1, -6));

  return { start, end };
}

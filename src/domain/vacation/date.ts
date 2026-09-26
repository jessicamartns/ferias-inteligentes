export type ISODate = string

const DAY_IN_MS = 24 * 60 * 60 * 1000

export function parseISODate(date: ISODate): Date {
  const [year, month, day] = date.split("-").map(Number)

  return new Date(
    Date.UTC(year, month - 1, day),
  )
}

export function formatISODate(date: Date): ISODate {
  return date.toISOString().slice(0, 10)
}

export function addDays(
  date: ISODate,
  amount: number,
): ISODate {
  const parsedDate = parseISODate(date)

  parsedDate.setUTCDate(
    parsedDate.getUTCDate() + amount,
  )

  return formatISODate(parsedDate)
}

export function differenceInDays(
  startDate: ISODate,
  endDate: ISODate,
): number {
  const start = parseISODate(startDate)
  const end = parseISODate(endDate)

  return Math.round(
    (end.getTime() - start.getTime()) /
      DAY_IN_MS,
  )
}

export function getDayOfWeek(
  date: ISODate,
): number {
  return parseISODate(date).getUTCDay()
}

export function isSaturday(
  date: ISODate,
): boolean {
  return getDayOfWeek(date) === 6
}

export function isSunday(
  date: ISODate,
): boolean {
  return getDayOfWeek(date) === 0
}

export function isWeekend(
  date: ISODate,
): boolean {
  return isSaturday(date) || isSunday(date)
}

export function getDateRange(
  startDate: ISODate,
  endDate: ISODate,
): ISODate[] {
  if (
    parseISODate(startDate).getTime() >
    parseISODate(endDate).getTime()
  ) {
    return []
  }

  const dates: ISODate[] = []

  let currentDate = startDate

  while (
    parseISODate(currentDate).getTime() <=
    parseISODate(endDate).getTime()
  ) {
    dates.push(currentDate)

    currentDate = addDays(currentDate, 1)
  }

  return dates
}
import type { ISODate } from "./date"

export type HolidayType =
  | "NATIONAL"
  | "STATE"
  | "MUNICIPAL"
  | "OPTIONAL"

export interface Holiday {
  date: ISODate
  name: string
  type: HolidayType

  state?: string
  city?: string
}

export interface HolidayLocation {
  state: string
  city: string
}

function normalizeLocation(value: string): string {
  return value.trim().toLowerCase()
}

export function isHolidayApplicable(
  holiday: Holiday,
  location: HolidayLocation,
): boolean {
  if (holiday.type === "NATIONAL") {
    return true
  }

  if (holiday.type === "STATE") {
    if (!holiday.state) {
      return false
    }

    return (
      normalizeLocation(holiday.state) ===
      normalizeLocation(location.state)
    )
  }

  if (holiday.type === "MUNICIPAL") {
    if (!holiday.state || !holiday.city) {
      return false
    }

    return (
      normalizeLocation(holiday.state) ===
        normalizeLocation(location.state) &&
      normalizeLocation(holiday.city) ===
        normalizeLocation(location.city)
    )
  }

  // Ponto facultativo pode ter abrangência
  // nacional, estadual ou municipal.

  if (holiday.city) {
    if (!holiday.state) {
      return false
    }

    return (
      normalizeLocation(holiday.state) ===
        normalizeLocation(location.state) &&
      normalizeLocation(holiday.city) ===
        normalizeLocation(location.city)
    )
  }

  if (holiday.state) {
    return (
      normalizeLocation(holiday.state) ===
      normalizeLocation(location.state)
    )
  }

  return true
}

export function getApplicableHolidaysByDate(
  date: ISODate,
  holidays: Holiday[],
  location: HolidayLocation,
): Holiday[] {
  return holidays.filter(
    (holiday) =>
      holiday.date === date &&
      isHolidayApplicable(holiday, location),
  )
}

export function getLegalHolidaysByDate(
  date: ISODate,
  holidays: Holiday[],
  location: HolidayLocation,
): Holiday[] {
  return getApplicableHolidaysByDate(
    date,
    holidays,
    location,
  ).filter(
    (holiday) => holiday.type !== "OPTIONAL",
  )
}

export function isLegalHoliday(
  date: ISODate,
  holidays: Holiday[],
  location: HolidayLocation,
): boolean {
  return (
    getLegalHolidaysByDate(
      date,
      holidays,
      location,
    ).length > 0
  )
}
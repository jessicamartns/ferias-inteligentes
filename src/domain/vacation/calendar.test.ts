import {
  describe,
  expect,
  it,
} from "vitest"

import { buildCalendarDay, buildCalendar } from "./calendar"

import type { Holiday } from "./holiday"

import {
  MONDAY_TO_FRIDAY,
} from "./workSchedule"

const campinas = {
  state: "SP",
  city: "Campinas",
}

const holidays: Holiday[] = [
  {
    date: "2027-01-01",
    name: "Ano Novo",
    type: "NATIONAL",
  },

  {
    date: "2027-01-04",
    name: "Ponto Facultativo de Teste",
    type: "OPTIONAL",
    state: "SP",
    city: "Campinas",
  },

  {
    date: "2027-01-05",
    name: "Feriado Municipal de Teste",
    type: "MUNICIPAL",
    state: "SP",
    city: "Campinas",
  },

  {
    date: "2027-01-06",
    name: "Feriado de Outra Cidade",
    type: "MUNICIPAL",
    state: "SP",
    city: "Sorocaba",
  },
]

describe("calendar", () => {
  it("identifies a normal weekday as working day", () => {
    const day = buildCalendarDay({
      date: "2027-01-07",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(day.scheduledWorkDay).toBe(true)
    expect(day.legalHolidays).toHaveLength(0)
    expect(day.isWorkingDay).toBe(true)
  })

  it("identifies Saturday as non-working day", () => {
    const day = buildCalendarDay({
      date: "2027-01-09",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(day.scheduledWorkDay).toBe(false)
    expect(day.isWorkingDay).toBe(false)
  })

  it("identifies Sunday as weekly rest day", () => {
    const day = buildCalendarDay({
      date: "2027-01-10",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(day.weeklyRestDay).toBe(true)
    expect(day.isWorkingDay).toBe(false)
  })

  it("does not consider legal holiday a working day", () => {
    const day = buildCalendarDay({
      date: "2027-01-05",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(day.scheduledWorkDay).toBe(true)
    expect(day.legalHolidays).toHaveLength(1)
    expect(day.isWorkingDay).toBe(false)
  })

  it("does not automatically treat optional day as day off", () => {
    const day = buildCalendarDay({
      date: "2027-01-04",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(day.optionalDays).toHaveLength(1)
    expect(day.legalHolidays).toHaveLength(0)

    expect(day.isWorkingDay).toBe(true)
  })

  it("ignores municipal holiday from another city", () => {
    const day = buildCalendarDay({
      date: "2027-01-06",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(day.legalHolidays).toHaveLength(0)
    expect(day.isWorkingDay).toBe(true)
  })

  it("builds an inclusive calendar range", () => {
    const calendar = buildCalendar({
      startDate: "2027-01-01",
      endDate: "2027-01-10",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(calendar).toHaveLength(10)
    expect(calendar[0].date).toBe(
      "2027-01-01",
    )
    expect(calendar[9].date).toBe(
      "2027-01-10",
    )
  })

})
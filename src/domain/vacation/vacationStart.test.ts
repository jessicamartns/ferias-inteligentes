import {
  describe,
  expect,
  it,
} from "vitest"

import type { Holiday } from "./holiday"

import {
  MONDAY_TO_FRIDAY,
} from "./workSchedule"

import {
  validateVacationStart,
} from "./vacationStart"

const campinas = {
  state: "SP",
  city: "Campinas",
}

describe("vacation start validation", () => {
  it("allows start when there is no holiday or weekly rest in the next two days", () => {
    const result = validateVacationStart({
      startDate: "2027-01-04",
      schedule: MONDAY_TO_FRIDAY,
      holidays: [],
      location: campinas,
    })

    expect(result.allowed).toBe(true)
    expect(result.blockers).toEqual([])
  })

  it("blocks start one day before a legal holiday", () => {
    const holidays: Holiday[] = [
      {
        date: "2027-01-05",
        name: "Feriado de Teste",
        type: "NATIONAL",
      },
    ]

    const result = validateVacationStart({
      startDate: "2027-01-04",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(result.allowed).toBe(false)

    expect(result.blockers).toContainEqual({
      date: "2027-01-05",
      reason: "LEGAL_HOLIDAY",
      holidayNames: ["Feriado de Teste"],
    })
  })

  it("blocks start two days before a legal holiday", () => {
    const holidays: Holiday[] = [
      {
        date: "2027-01-06",
        name: "Feriado de Teste",
        type: "NATIONAL",
      },
    ]

    const result = validateVacationStart({
      startDate: "2027-01-04",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(result.allowed).toBe(false)
  })

  it("allows start when holiday is three days later", () => {
    const holidays: Holiday[] = [
      {
        date: "2027-01-07",
        name: "Feriado de Teste",
        type: "NATIONAL",
      },
    ]

    const result = validateVacationStart({
      startDate: "2027-01-04",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(result.allowed).toBe(true)
  })

  it("blocks Friday because Sunday is the weekly rest day", () => {
    const result = validateVacationStart({
      startDate: "2027-01-08",
      schedule: MONDAY_TO_FRIDAY,
      holidays: [],
      location: campinas,
    })

    expect(result.allowed).toBe(false)

    expect(result.blockers).toContainEqual({
      date: "2027-01-10",
      reason: "WEEKLY_REST_DAY",
    })
  })

  it("does not block because of an optional day", () => {
    const holidays: Holiday[] = [
      {
        date: "2027-01-05",
        name: "Ponto Facultativo",
        type: "OPTIONAL",
        state: "SP",
        city: "Campinas",
      },
    ]

    const result = validateVacationStart({
      startDate: "2027-01-04",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(result.allowed).toBe(true)
  })

  it("ignores municipal holiday from another city", () => {
    const holidays: Holiday[] = [
      {
        date: "2027-01-05",
        name: "Feriado Municipal",
        type: "MUNICIPAL",
        state: "SP",
        city: "Sorocaba",
      },
    ]

    const result = validateVacationStart({
      startDate: "2027-01-04",
      schedule: MONDAY_TO_FRIDAY,
      holidays,
      location: campinas,
    })

    expect(result.allowed).toBe(true)
  })
})
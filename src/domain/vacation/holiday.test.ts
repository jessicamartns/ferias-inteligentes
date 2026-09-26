import {
  describe,
  expect,
  it,
} from "vitest"

import {
  getApplicableHolidaysByDate,
  getLegalHolidaysByDate,
  isHolidayApplicable,
  isLegalHoliday,
  type Holiday,
} from "./holiday"

const holidays: Holiday[] = [
  {
    date: "2027-01-01",
    name: "Feriado Nacional",
    type: "NATIONAL",
  },

  {
    date: "2027-02-01",
    name: "Feriado Estadual SP",
    type: "STATE",
    state: "SP",
  },

  {
    date: "2027-03-01",
    name: "Feriado Municipal Campinas",
    type: "MUNICIPAL",
    state: "SP",
    city: "Campinas",
  },

  {
    date: "2027-03-01",
    name: "Feriado Municipal Sorocaba",
    type: "MUNICIPAL",
    state: "SP",
    city: "Sorocaba",
  },

  {
    date: "2027-04-01",
    name: "Ponto Facultativo",
    type: "OPTIONAL",
    state: "SP",
    city: "Campinas",
  },
]

const campinas = {
  state: "SP",
  city: "Campinas",
}

describe("holiday", () => {
  describe("isHolidayApplicable", () => {
    it("applies national holiday to any location", () => {
      expect(
        isHolidayApplicable(
          holidays[0],
          campinas,
        ),
      ).toBe(true)
    })

    it("applies state holiday to matching state", () => {
      expect(
        isHolidayApplicable(
          holidays[1],
          campinas,
        ),
      ).toBe(true)
    })

    it("does not apply state holiday to another state", () => {
      expect(
        isHolidayApplicable(
          holidays[1],
          {
            state: "RJ",
            city: "Rio de Janeiro",
          },
        ),
      ).toBe(false)
    })

    it("applies municipal holiday only to matching city", () => {
      expect(
        isHolidayApplicable(
          holidays[2],
          campinas,
        ),
      ).toBe(true)

      expect(
        isHolidayApplicable(
          holidays[3],
          campinas,
        ),
      ).toBe(false)
    })

    it("ignores casing when comparing locations", () => {
      expect(
        isHolidayApplicable(
          holidays[2],
          {
            state: "sp",
            city: "campinas",
          },
        ),
      ).toBe(true)
    })
  })

  describe("getApplicableHolidaysByDate", () => {
    it("returns only holidays applicable to the location", () => {
      const result =
        getApplicableHolidaysByDate(
          "2027-03-01",
          holidays,
          campinas,
        )

      expect(result).toHaveLength(1)

      expect(result[0].name).toBe(
        "Feriado Municipal Campinas",
      )
    })
  })

  describe("getLegalHolidaysByDate", () => {
    it("does not consider optional days as legal holidays", () => {
      const result =
        getLegalHolidaysByDate(
          "2027-04-01",
          holidays,
          campinas,
        )

      expect(result).toEqual([])
    })
  })

  describe("isLegalHoliday", () => {
    it("returns true for applicable legal holiday", () => {
      expect(
        isLegalHoliday(
          "2027-01-01",
          holidays,
          campinas,
        ),
      ).toBe(true)
    })

    it("returns false for optional day", () => {
      expect(
        isLegalHoliday(
          "2027-04-01",
          holidays,
          campinas,
        ),
      ).toBe(false)
    })

    it("returns false for holiday from another city", () => {
      expect(
        isLegalHoliday(
          "2027-03-01",
          [
            {
              date: "2027-03-01",
              name: "Feriado Sorocaba",
              type: "MUNICIPAL",
              state: "SP",
              city: "Sorocaba",
            },
          ],
          campinas,
        ),
      ).toBe(false)
    })
  })
})
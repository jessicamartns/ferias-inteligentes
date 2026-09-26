import {
  isValidVacationPlan,
  VACATION_RULES,
} from "./rules"

interface GenerateVacationSplitsInput {
  remainingDays: number
  existingPeriods?: number[]
}

export function generateVacationSplits({
  remainingDays,
  existingPeriods = [],
}: GenerateVacationSplitsInput): number[][] {
  if (remainingDays <= 0) {
    return []
  }

  const availablePeriods =
    VACATION_RULES.maxPeriods - existingPeriods.length

  if (availablePeriods <= 0) {
    return []
  }

  const results: number[][] = []

  for (
    let numberOfNewPeriods = 1;
    numberOfNewPeriods <= availablePeriods;
    numberOfNewPeriods++
  ) {
    generateCombinations(
      remainingDays,
      numberOfNewPeriods,
      remainingDays,
      [],
      results,
      existingPeriods,
    )
  }

  return results
}

function generateCombinations(
  remainingDays: number,
  periodsLeft: number,
  maximumValue: number,
  current: number[],
  results: number[][],
  existingPeriods: number[],
): void {
  if (periodsLeft === 0) {
    if (remainingDays !== 0) {
      return
    }

    const completePlan = [
      ...existingPeriods,
      ...current,
    ]

    if (isValidVacationPlan(completePlan)) {
      results.push([...current])
    }

    return
  }

  const minimumDaysNeeded =
    (periodsLeft - 1) *
    VACATION_RULES.minimumShortPeriod

  const maximumCurrentPeriod =
    remainingDays - minimumDaysNeeded

  for (
    let days = Math.min(
      maximumCurrentPeriod,
      maximumValue,
    );
    days >= VACATION_RULES.minimumShortPeriod;
    days--
  ) {
    generateCombinations(
      remainingDays - days,
      periodsLeft - 1,
      days,
      [...current, days],
      results,
      existingPeriods,
    )
  }
}
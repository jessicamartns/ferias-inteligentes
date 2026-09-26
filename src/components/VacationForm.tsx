import { useState } from "react"
import { optimizeVacation } from "../domain/vacation/optimizer"
import {MONDAY_TO_FRIDAY} from "../domain/vacation/workSchedule"

export function VacationForm() {
  const [availableDays, setAvailableDays] = useState(30)
  const [plans, setPlans] = useState<any[]>([])

  function handleSubmit() {
    const input = {
      availableDays,
      alreadyUsedDays: 0,
      alreadyUsedPeriods: 0,
      availableFrom: "2026-10-25",
      deadline: "2027-07-04",
      city: "Campinas",
      state: "SP",
      workSchedule: MONDAY_TO_FRIDAY,
    }

    const result = optimizeVacation(input)

    setPlans(result)
  }

  return (
    <div>
      <h1>Planejador de férias</h1>

      <label>
        Dias de férias
      </label>

      <input
        type="number"
        value={availableDays}
        onChange={(event) =>
          setAvailableDays(Number(event.target.value))
        }
      />

      <button onClick={handleSubmit}>
        Calcular férias
      </button>

      {plans.length > 0 && (
        <div>
          <h2>Resultado</h2>

          <p>
            Dias de férias usados:{" "}
            {plans[0].vacationDaysUsed}
          </p>

          <p>
            Total de dias de descanso:{" "}
            {plans[0].totalRestDays}
          </p>
        </div>
      )}
    </div>
  )
}
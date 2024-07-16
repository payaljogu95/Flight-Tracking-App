import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { formatDate } from "app/utils/formatDate"

/**
 * Flight Model to store Flight Data
 */

interface Arrival {
  airport: string
  timezone: string
  iata: string
  icao: string
  terminal: string
  gate: null | string
  baggage?: null
  delay: number | null
  scheduled: string
  estimated: string
  actual: string | null
  estimated_runway: string | null
  actual_runway: string | null
}

interface Airline {
  name: string
  iata: string
  icao: string
}

interface Flight {
  number: string
  iata: string
  icao: string
  codeshared: null
}

export const FlightsModel = types
  .model("Flights")
  .props({
    flight_date: types.string,
    flight_status: types.string,
    departure: types.frozen<Arrival>(),
    arrival: types.frozen<Arrival>(),
    airline: types.frozen<Airline>(),
    flight: types.frozen<Flight>(),
  })
  .actions(withSetPropAction)
  .views((flight) => ({
    // get formated schedule date 
    get formatedScheduleDate() {
      try {
        const formatedDate = formatDate(flight.departure.scheduled,"yyyy-MM-dd")
        return  formatedDate
      } catch (error) {
        return ''
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Flights extends Instance<typeof FlightsModel> {}
export interface FlightsSnapshotOut extends SnapshotOut<typeof FlightsModel> {}
export interface FlightsSnapshotIn extends SnapshotIn<typeof FlightsModel> {}
export const createFlightsDefaultModel = () => types.optional(FlightsModel, {})

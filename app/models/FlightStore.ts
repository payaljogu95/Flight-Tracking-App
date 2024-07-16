import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { FlightsModel } from "./Flights"
import { api } from "app/services/api"

/**
 * Flight store model to convert api response
 */
export const FlightStoreModel = types
  .model("FlightStore")
  .props({
    flightData: types.array(FlightsModel),
  })
  .actions(withSetPropAction)
  .views((store) => ({

    // to get single flight data from array
    get getFlights() {
      return store.flightData
    },

  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchFightDetail(fightIataOrIcaoNo: string) {
      const response = await api.getFlightDetail(fightIataOrIcaoNo)
      if (response.kind === "ok") {
       // store flight data on success
        store.setProp("flightData", response.flightData)
      } else {
         // store empty array on error
        store.setProp("flightData", []);
        console.error(`Error fetching flight data: ${JSON.stringify(response)}`)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface FlightStore extends Instance<typeof FlightStoreModel> {}
export interface FlightStoreSnapshotOut extends SnapshotOut<typeof FlightStoreModel> {}
export interface FlightStoreSnapshotIn extends SnapshotIn<typeof FlightStoreModel> {}
export const createFlightStoreDefaultModel = () => types.optional(FlightStoreModel, {})

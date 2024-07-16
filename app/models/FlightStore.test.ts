import { FlightStoreModel } from "./FlightStore"

test("can be created", () => {
  const instance = FlightStoreModel.create({})

  expect(instance).toBeTruthy()
})

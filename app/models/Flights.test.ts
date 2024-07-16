import { FlightsModel } from "./Flights"

test("can be created", () => {
  const instance = FlightsModel.create({})

  expect(instance).toBeTruthy()
})

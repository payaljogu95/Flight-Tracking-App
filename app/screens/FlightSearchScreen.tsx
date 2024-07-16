/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TextStyle, View, ViewStyle, Platform } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import Ionicons from "@expo/vector-icons/Ionicons"

interface FlightSearchScreenProps extends AppStackScreenProps<"FlightSearch"> {}

// Flight Search Screen To Search Flight Details by ICAO number
export const FlightSearchScreen: FC<FlightSearchScreenProps> = observer(
  function FlightSearchScreen() {
    // Flight store access to get store data from api
    const { flightStore } = useStores()

    // loading status to show loading when api calling
    const [isLoading, setIsLoading] = React.useState(false)

    // to store user input ICAO No.
    const [fightIcaoNo, setFightIcaoNo] = useState("CSZ1843")

    // On search, fetch flight details
    async function fetchFlightDetails() {
      // check if ICAO number is not empty before api call
      if (fightIcaoNo.length > 0) {
        setIsLoading(true)  // show loader still api calling is in progress
        await flightStore.fetchFightDetail(fightIcaoNo) // access fight store and call fetch fight detail with ICAO number
        setIsLoading(false)
      } else {
        alert("Please Enter Flight ICAO number.") // Show alert when user search without entering ICAO Number
      }
    }
    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
        <Text preset="heading" text="FlightSearch" />
        <View style={{ flexDirection: "row" }}>
          <TextField
            onChangeText={(value) => setFightIcaoNo(value)}
            containerStyle={$textField}
            value={fightIcaoNo}
            placeholder="Enter Flight ICAO number"
          />
          <Button
            style={[$button, { minHeight: 40 }]}
            testID="next-screen-button"
            preset="reversed"
            onPress={fetchFlightDetails} // On press call fetchFlightDetails
            text={"Search"}
          />
        </View>

        {isLoading ? (
          <ActivityIndicator />
        ) : flightStore.getFlights.length > 0 ? ( // check if data found or not
          <View style={$cardView}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#001B4E" }}>
              {"Flights Details"}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <View>
                <Text>Flight</Text>
                <Text>{flightStore.getFlights[0].flight_date}</Text>
              </View>
              <View style={{ marginHorizontal: 30 }}>
                <Text>Gate</Text>
                <Text>{flightStore.getFlights[0].departure?.gate}</Text>
              </View>
              <View>
                <Text>Schedule</Text>
                <Text>{flightStore.getFlights[0].formatedScheduleDate}</Text>
              </View>
            </View>
            <View style={{ borderColor: colors.border, borderTopWidth: 1, marginVertical: 20 }} />
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <EvilIcons name="location" size={25} color={colors.palette.neutral800} />
                <Text style={$text}>{flightStore.getFlights[0].departure?.airport}</Text>
              </View>
              <View style={$verticalLine} />
              <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                <Ionicons name="airplane-outline" size={25} color={colors.palette.neutral800} />
                <Text style={$text}>
                  {flightStore.getFlights[0].airline?.name +
                    " (" +
                    flightStore.getFlights[0].flight?.icao +
                    ")"}
                </Text>
              </View>
              <View style={$verticalLine} />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <EvilIcons name="location" size={25} color={colors.palette.neutral800} />
                <Text style={$text}>{flightStore.getFlights[0].arrival?.airport}</Text>
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

const $text: TextStyle = {
  marginLeft: 10,
}

const $textField: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
  marginTop: spacing.md,
  flex: 1,
  marginHorizontal: 10,
  height: 45,
}

const $cardView: ViewStyle = {
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "#EAEEF5",
  flex: 1,
  padding: 15,
  margin: 15,
  ...Platform.select({
    android: {
      backgroundColor: "white",
      shadowOpacity: 0.26,
      shadowRadius: 10,
      elevation: 10,
      shadowColor: "#000000",
    },
    ios: {
      shadowColor: "#CAD8EEBF",
      shadowOpacity: 1,
      shadowRadius: 5,
      backgroundColor: "white",
      shadowOffset: { height: 2, width: 2 },
    },
  }),
}

const $button: ViewStyle = {
  marginBottom: spacing.md,
  marginTop: spacing.md,
  marginHorizontal: 10,
  height: 10,
}

const $verticalLine: ViewStyle = {
  borderLeftWidth: 1,
  borderColor: colors.palette.neutral800,
  height: 20,
  marginLeft: 12,
}

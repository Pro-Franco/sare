import React from "react"
import { useLocalSearchParams } from "expo-router"
import { HomeScreen } from "./src/screens"

export default function HomeRoute() {
  const params = useLocalSearchParams()
  const route = { params }

  return <HomeScreen route={route as any} />
}

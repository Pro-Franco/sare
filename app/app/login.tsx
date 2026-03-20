import React from "react"
import { useRouter } from "expo-router"
import { LoginScreen } from "./src/screens"

export default function LoginRoute() {
  const router = useRouter()

  return (
    <LoginScreen
      goTo={(path: string) => router.push(path as any)}
      goBack={router.back}
    />
  )
}


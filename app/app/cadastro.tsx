

import React from "react"
import { useRouter } from "expo-router"
import { CadastroScreen } from "./src/screens"

export default function LoginRoute() {
  const router = useRouter()

  return (
    <CadastroScreen
      goTo={(path: string) => router.push(path as any)}
      goBack={router.back}
    />
  )
}


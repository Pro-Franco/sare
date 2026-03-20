import { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { API_URL } from "../../lib/services/api"

export default function LoginScreen({ goTo, goBack }: any) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function login() {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      })

      const data = await res.json()

      if (data.token) {
        if (goTo) goTo(`/home?token=${data.token}`)
        else if (goBack) goBack()
      } else {
        Alert.alert("Erro", data.erro)
      }
    } catch {
      Alert.alert("Erro", "Falha ao conectar")
    }
  }

  return (
    
  )
}
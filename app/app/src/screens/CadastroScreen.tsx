import { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { API_URL } from "../../lib/services/api"

export default function CadastroScreen({ goTo, goBack }: any) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function cadastrar() {
    const res = await fetch(`${API_URL}/auth/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    })

    const data = await res.json()

    if (data.id) {
      Alert.alert("Sucesso", "Usuário criado")
      if (goBack) goBack()
    } else {
      Alert.alert("Erro", data.erro)
    }
  }

  return (
 
  )
}
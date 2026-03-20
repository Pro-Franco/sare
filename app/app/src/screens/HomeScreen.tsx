import { useEffect, useState } from "react"
import { View, Text, Button, TextInput, FlatList, Alert } from "react-native"
import { API_URL } from "../../lib/services/api"

export default function HomeScreen({ route }: any) {
  const { token } = route.params

  const [perfil, setPerfil] = useState<any>(null)
  const [reservas, setReservas] = useState<any[]>([])
  const [sala, setSala] = useState("")
  const [data, setData] = useState("")

  async function carregarPerfil() {
    const res = await fetch(`${API_URL}/usuarios/perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setPerfil(data)
  }

  async function carregarReservas() {
    const res = await fetch(`${API_URL}/reservas`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setReservas(data)
  }

  async function criarReserva() {
    // Validação básica
    if (!sala.trim()) {
      Alert.alert("Erro", "Informe a sala")
      return
    }
    if (!data.trim()) {
      Alert.alert("Erro", "Informe a data")
      return
    }

    // Aceitar formato pt-BR (DD/MM/AAAA) e converter para ISO (AAAA-MM-DD)
    function normalizeDate(input: string) {
      const ptbr = /^\s*(\d{2})\/(\d{2})\/(\d{4})\s*$/
      const iso = /^\s*(\d{4})-(\d{2})-(\d{2})\s*$/
      const m1 = input.match(ptbr)
      if (m1) {
        const [, d, m, y] = m1
        return `${y}-${m}-${d}`
      }
      const m2 = input.match(iso)
      if (m2) return input.trim()
      return null
    }

    const dateNormalized = normalizeDate(data)
    if (!dateNormalized) {
      Alert.alert("Erro", "Formato de data inválido. Use DD/MM/AAAA")
      return
    }

    await fetch(`${API_URL}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ sala, data: dateNormalized })
    })

    setSala("")
    setData("")
    carregarReservas()
  }

  useEffect(() => {
    carregarPerfil()
    carregarReservas()
  }, [])

  return (
   
  )
}
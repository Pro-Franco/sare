import express from "express"
import cors from "cors"
import os from "os"

import "./database/database"

import authRoutes from "./rotes/auth.routes"
import usuarioRoutes from "./rotes/usuario.routes"
import reservaRoutes from "./rotes/reserva.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/usuarios", usuarioRoutes)
app.use("/reservas", reservaRoutes)

app.get("/", (_, res) => {
  res.send("API rodando")
})

// Health check: ping-pong
app.get("/ping", (_, res) => {
  res.json({ pong: true, time: new Date().toISOString() })
})

app.listen(3000, "0.0.0.0", () => {
console.log(`
  =========================================
          API RESERVAS INICIANDO 
  =========================================

        (•‿•)
       <)   )╯
        /   \\

  Olá, desenvolvedor 
  Sistema iniciando com sucesso...

  =========================================
  `)

  console.log("Seu servidor está rodando em:")
  console.log("http://localhost:3000")

  // Log IPs para facilitar conexão a partir de dispositivos na mesma rede
  const nets = os.networkInterfaces()
  const addresses: string[] = []
  Object.values(nets).forEach((netList) => {
    if (!netList) return
    netList.forEach((net) => {
      if (net.family === "IPv4" && !net.internal) addresses.push(net.address)
    })
  })
  if (addresses.length) {
    console.log("IPs locais detectados (use um destes no app Expo):")
    addresses.forEach((a) => console.log(`  http://${a}:3000`))
  } else {
    console.log("Nenhum IP local detectado automaticamente.")
  }
})
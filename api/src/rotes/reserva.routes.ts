import { Router, Request, Response } from "express"
import db from "../database/database"
import { auth } from "../middlewares/auth"

const router = Router()

interface Reserva {
  id: number
  sala: string
  data: string
  usuario_id: number
}

// Criar reserva
router.post("/", auth, (req: Request, res: Response) => {
  const { sala, data } = req.body as {
    sala: string
    data: string
  }

  if (!sala || !data) {
    return res.status(400).json({ erro: "Preencha sala e data" })
  }

  const result = db
    .prepare(
      "INSERT INTO reservas (sala, data, usuario_id) VALUES (?, ?, ?)"
    )
    .run(sala, data, req.usuarioId)

  return res.json({
    mensagem: "Reserva criada",
    id: result.lastInsertRowid
  })
})

// Listar reservas
router.get("/", auth, (req: Request, res: Response) => {
  const reservas = db
    .prepare("SELECT * FROM reservas WHERE usuario_id = ?")
    .all(req.usuarioId) as Reserva[]

  return res.json(reservas)
})

export default router
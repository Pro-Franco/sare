import { Router, Request, Response } from "express"
import db from "../database/database"
import { auth } from "../middlewares/auth"

const router = Router()

interface Usuario {
  id: number
  nome: string
  email: string
}

// Perfil
router.get("/perfil", auth, (req: Request, res: Response) => {
  const usuario = db
    .prepare("SELECT id, nome, email FROM usuarios WHERE id = ?")
    .get(req.usuarioId) as Usuario | undefined

  return res.json(usuario)
})

export default router
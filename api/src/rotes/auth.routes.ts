import { Router, Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../database/database"

const router = Router()
const SEGREDO = "segredo_super_simples"

interface Usuario {
  id: number
  nome: string
  email: string
  senha: string
}

// Cadastro
router.post("/cadastro", async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body as {
    nome: string
    email: string
    senha: string
  }

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos" })
  }

  const usuario = db
    .prepare("SELECT * FROM usuarios WHERE email = ?")
    .get(email) as Usuario | undefined

  if (usuario) {
    return res.status(400).json({ erro: "Email já cadastrado" })
  }

  const senhaHash = await bcrypt.hash(senha, 8)

  const result = db
    .prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)")
    .run(nome, email, senhaHash)

  return res.json({
    mensagem: "Usuário criado",
    id: result.lastInsertRowid
  })
})

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { email, senha } = req.body as {
    email: string
    senha: string
  }

  const usuario = db
    .prepare("SELECT * FROM usuarios WHERE email = ?")
    .get(email) as Usuario | undefined

  if (!usuario) {
    return res.status(400).json({ erro: "Usuário não encontrado" })
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha)

  if (!senhaValida) {
    return res.status(400).json({ erro: "Senha inválida" })
  }

  const token = jwt.sign({ id: usuario.id }, SEGREDO, {
    expiresIn: "1d"
  })

  return res.json({ token })
})

export default router
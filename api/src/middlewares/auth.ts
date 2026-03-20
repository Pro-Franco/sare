import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const SEGREDO = "segredo_super_simples" //criar um arquivo .env para guardar isso

interface TokenPayload {
  id: number
}

export function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não enviado" })
  }

  const [, token] = authHeader.split(" ")

  try {
    const decoded = jwt.verify(token, SEGREDO) as TokenPayload
    req.usuarioId = decoded.id
    next()
  } catch {
    return res.status(401).json({ erro: "Token inválido" })
  }
}
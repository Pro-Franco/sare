import Database from "better-sqlite3"
import bcrypt from "bcryptjs"

const db = new Database("dbReservas.db")

db.exec(`
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reservas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sala TEXT NOT NULL,
  data TEXT NOT NULL,
  usuario_id INTEGER,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
`)

// Seed: criar usuários de teste (admin e user) se não existirem
const adminEmail = "admin@exemplo.com"
const userEmail = "usuario@exemplo.com"

const getUser = db.prepare("SELECT id FROM usuarios WHERE email = ?")

let adminId = (getUser.get(adminEmail) as any)?.id as number | undefined
if (!adminId) {
  const senhaHash = bcrypt.hashSync("admin123", 8)
  const result = db
    .prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)")
    .run("Admin", adminEmail, senhaHash)
  adminId = result.lastInsertRowid
}

let userId = (getUser.get(userEmail) as any)?.id as number | undefined
if (!userId) {
  const senhaHash = bcrypt.hashSync("usuario123", 8)
  const result = db
    .prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)")
    .run("User Test", userEmail, senhaHash)
  userId = result.lastInsertRowid
}

// Seed: adicionar algumas reservas de exemplo se não existirem
const reservasCount = (db.prepare("SELECT COUNT(*) as c FROM reservas").get() as any).c
if (!reservasCount || reservasCount === 0) {
  const insert = db.prepare(
    "INSERT INTO reservas (sala, data, usuario_id) VALUES (?, ?, ?)"
  )
  insert.run("Sala A", "2026-03-20", adminId)
  insert.run("Sala B", "2026-03-21", userId)
  insert.run("Sala C", "2026-03-22", userId)
}

export default db
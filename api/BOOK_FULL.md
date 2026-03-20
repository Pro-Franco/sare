# Guia prático: API de Reservas e App Expo

Este documento é um guia claro e direto para você entender e rodar a API de reservas (Node.js + TypeScript + SQLite) e o app mobile feito em Expo. Escrevi com linguagem mais leve, exemplos práticos e indicações de onde ficam os arquivos no projeto — perfeito para estudo ou para usar em uma aula.

Sumário rápido

- Preparar o ambiente
- Backend: o que faz e onde está cada arquivo
- Frontend Expo: fluxo e telas principais
- Como testar localmente (curl / Expo)
- Sugestões de evolução

Se preferir, pule para a seção que deseja. O apêndice contém os pontos de entrada e comandos úteis.

---

1) Preparar o ambiente (rápido)

Requisitos mínimos: Node.js, npm e (se for testar o app) Expo.

Instalar dependências do backend (na raiz):

```bash
npm install
```

Instalar e rodar o app Expo (pasta do app):

```bash
cd app/app-reservas
npm install
npx expo start -c
```

Dica prática: para testar em dispositivo físico, atualize `app/lib/services/api.ts` com o IP da sua máquina (por exemplo `http://192.168.0.100:3000`).

---

2) Backend — visão geral e responsabilidades

O backend é simples e didático, organizado para ficar fácil de entender:

- `src/app.ts`: monta o servidor e monta as rotas.
- `src/database/database.ts`: cria o banco SQLite e insere dados de exemplo (seed).
- `src/rotes/`: contém `auth.routes`, `usuario.routes` e `reserva.routes`.
- `src/middlewares/auth.ts`: valida JWT e põe `req.usuarioId` para as rotas protegidas.

Como o sistema funciona em alto nível:

- Usuário se cadastra ou faz login (`/auth`), recebe um token JWT.
- Rotas de perfil e reservas usam esse token (header `Authorization: Bearer <token>`).
- O middleware `auth` verifica o token e permite o acesso.

Por que essa estrutura? Ela separa responsabilidades e facilita testar e entender cada parte.

---

3) Frontend (Expo) — fluxo simplificado

O app tem telas simples: Login, Cadastro e Home. Resumo do fluxo:

- Login chama `POST /auth/login` e, se tiver token, navega para Home.
- Home pede `/usuarios/perfil` e `/reservas` usando o token para mostrar os dados.
- Criar reserva faz `POST /reservas` com o token.

Observação prática: o projeto usa `expo-router`. Para evitar conflitos, coloquei a constante `API_URL` em `app/lib/services/api.ts` — assim o bundler não trata o arquivo como rota.

---

4) Testes rápidos (manual)

Login com curl (exemplo):

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","senha":"admin123"}'
```

Depois de obter o token, use `Authorization: Bearer <token>` para acessar `/usuarios/perfil` e `/reservas`.

No Expo: atualize `app/lib/services/api.ts` com seu IP, rode `npx expo start -c` e abra o app no Expo Go.

Problemas comuns:

- Erro `Network request failed`: verifique se o dispositivo e a máquina estão na mesma rede.
- Token inválido: confira se o servidor está rodando e se o token retornado é o do ambiente local.

---

5) Boas práticas e próximos passos

Para tornar o projeto mais robusto:

- Mova segredos (JWT secret) para variáveis de ambiente.
- Adicione validação de entrada (por exemplo com Zod).
- Em produção, use um banco mais robusto (Postgres) e um ORM (Prisma).

Esses passos também são ótimas aulas práticas para quem quer avançar.

---

6) Onde estão os trechos de código importantes

Se quiser ler os códigos completos, procure os arquivos abaixo (conteúdo já existe no repositório):

- `src/app.ts` — entrada do servidor
- `src/database/database.ts` — criação do DB + seeds
- `src/middlewares/auth.ts` — middleware JWT
- `src/rotes/auth.routes.ts` — cadastro/login
- `src/rotes/usuario.routes.ts` — perfil
- `src/rotes/reserva.routes.ts` — criar/listar reservas
- `app/lib/services/api.ts` — `API_URL` do app

No apêndice da versão anterior eu incluí vários exemplos de código; mantive o código no repositório para consulta direta, e aqui foquei em explicar o fluxo e os porquês.

---

7) Quer que eu faça algo a seguir?

- Posso gerar um PDF deste guia em `docs/BOOK_FULL.pdf`.
- Posso criar um ZIP com o projeto + PDF para distribuição.
- Posso reescrever o apêndice incluindo só os trechos de código que você preferir (menos verboso).

Diga qual opção prefere (PDF, ZIP, apêndice reduzido) que eu gero em seguida.

---

Apêndice rápido — comandos úteis

Rodar backend em desenvolvimento:

```bash
npm run dev
```

Rodar Expo (app):

```bash
cd app/app-reservas
npx expo start -c
```

Com isso o aluno consegue colocar as mãos na prática em minutos.

FIM

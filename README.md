
# Projeto Reservas — SARE 1.0

Aplicação de exemplo para gerenciar reservas de salas (API + app mobile + exemplos).

## Estrutura

- `api/` — servidor em Node + TypeScript (Express, SQLite)
- `app/` — cliente mobile (Expo / React Native)
- `exemplos/` — scripts e exemplos em TypeScript

## Pré-requisitos

- Node.js 18+ e npm
- Expo CLI (opcional):

```bash
npm install -g expo-cli
```

## Instalar dependências

API:

```bash
cd api
npm install
```

App (Expo):

```bash
cd app
npm install
```

Exemplos:

```bash
cd exemplos
npm install
```

## Rodar a API

```bash
cd api
npm run dev
```

Por padrão a API roda na porta `3000`. Se for acessar a partir do Expo em um dispositivo físico, use o IP da sua máquina (ex.: `http://192.168.x.x:3000`). O servidor imprime os IPs locais ao iniciar.

## Rodar o app (Expo)

```bash
cd app
expo start
```

- Abra no Expo Go (dispositivo físico) ou emulador.
- Para evitar problemas de rede, rode `expo start --tunnel`.
- Emuladores:
  - Android emulator: use `http://10.0.2.2:3000`
  - iOS simulator: use `http://localhost:3000`

Verifique `app/app/lib/services/api.ts` para a `API_URL` correta.

## Rodar exemplos

```bash
cd exemplos
npx ts-node ./exemplo-conectar-api.ts
```

Se necessário permitir import de `.ts` nas importações, no PowerShell:

```powershell
$env:TS_NODE_COMPILER_OPTIONS='{"allowImportingTsExtensions":true}'; npx ts-node .\exemploImports.ts
```

## Observações

- Se o app não conseguir conectar, verifique o firewall do sistema e se o dispositivo está na mesma rede local.
- Para debugging rápido, use o endpoint de health: `GET /ping` (ex.: `http://<IP>:3000/ping`).

## Comandos úteis

- API: `cd api && npm run dev`
- App: `cd app && expo start`
- Exemplos: `cd exemplos && npx ts-node ./exemplo-conectar-api.ts`

---

Se quiser, eu posso:

- Adicionar detecção automática de `API_URL` no app (detecta emulador / simulator / dispositivo físico).
- Documentar passo a passo para Windows/macOS.

# Importante
## Acesse a pasta de projeto
## Verifique se o terminal esta aberto em cmd - command prompt em seguida rode o camando abaixo para instalar as dependencias

# Arquivo de informação: 
## Passos a seguir:
```bash
    1 - Baixe no seu computador/notbook;
    2 - Copie o arquivo que deve baixar no zipado para a pasta de trabalho;
    3 - Descompacte o arquivo;
    4 - Abra o vscode selecine a pasta de trabalho e instale as dependencias: npm intall;
    5 - Abra o terminal e rode o serivdor: npm run dev
    5 - Em um novo terminal rode os passos 7 e 8.
```


# Apenas para conhecimento dos arquivos e arquitetura do servidor

```bash
api-reservas-ts/
├── src/
│   ├── database.ts
│   ├── types/
│   │   └── express.d.ts
│   ├── middlewares/
│   │   └── auth.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── usuario.routes.ts
│   │   └── reserva.routes.ts
│   └── app.ts
├── tsconfig.json
├── package.json

npm init -y
npm install express cors jsonwebtoken bcryptjs better-sqlite3
npm install -D typescript ts-node-dev @types/express @types/jsonwebtoken @types/bcryptjs @types/node



Criar o arquivo
tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}


"scripts": {
  "dev": "ts-node-dev --respawn src/app.ts"
}

```



7 - Testar servior
```bash
    curl.exe http://localhost:3000/ping 
```

8 - Testar usuário senha
```bash
    powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\login.ps1 -BaseUrl http://localhost:3000 -Email admin@example.com -Senha admin123
```

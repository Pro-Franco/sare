// exemplo-conectar-api-simples.ts
// Objetivo: fazer um GET em http://localhost:3000/ping e mostrar a resposta.
// Como rodar (na pasta raiz do projeto):
//  npx ts-node exemplos/exemplo-conectar-api-simples.ts
// exemplo-conectar-api-simples.ts (versão com fetch)
// Exemplo bem simples, legível para iniciantes, usando `fetch`.
// Requisito: Node 18+ (que tem `fetch` global). Se sua versão for mais
// antiga, instale `node-fetch` ou atualize o Node.
// Como rodar:
//  npx ts-node exemplos/exemplo-conectar-api-simples.ts

// Usamos (globalThis as any).fetch para evitar erros de tipo em tsconfig
// que não liste a lib DOM — isso mantém o exemplo simples.

async function main() {
  try {
    // 1) GET /ping
    console.log("==> GET /ping");
    const pingRes = await (globalThis as any).fetch("http://localhost:3000/ping");
    // tenta parsear como JSON, senão pega texto
    let pingBody;
    try {
      pingBody = await pingRes.json();
    } catch {
      pingBody = await pingRes.text();
    }
    console.log("Status:", pingRes.status);
    console.log("Corpo:", pingBody);

    // 2) POST /auth/login (exemplo didático)
    console.log("\n==> POST /auth/login");
    const credenciais = { email: "teste@exemplo.com", senha: "123456" };
    const loginRes = await (globalThis as any).fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credenciais),
    });

    let loginBody;
    try {
      loginBody = await loginRes.json();
    } catch {
      loginBody = await loginRes.text();
    }
    console.log("Status:", loginRes.status);
    console.log("Resposta do login:", loginBody);

    // Dica: se receber { token: '...' } você pode usar esse token
    // nas próximas requisições adicionando o header `Authorization: Bearer <token>`.

  } catch (err: any) {
    console.error("Erro ao conectar na API:", err.message || err);
  }
}

main();

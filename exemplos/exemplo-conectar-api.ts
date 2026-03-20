/**
 * exemplo-conectar-api.ts
 * Exemplo didático que conecta na API local em http://localhost:3000
 * Ele faz um GET em `/ping` e imprime o resultado.
 *
 * Como rodar (na raiz do projeto, onde está package.json):
 * - Usando ts-node (executa TypeScript direto):
 *   npx ts-node exemplos/exemplo-conectar-api.ts
 *
 * - Compilar com tsc e executar com node (gera .js):
 *   npx tsc exemplos/exemplo-conectar-api.ts
 *   node exemplos/exemplo-conectar-api.js
 *
 * Observação sobre o erro anterior:
 * - Erro: "Module '\"http\"' has no default export"
 * - Causa: `import http from 'http'` tenta importar um default que não existe
 * - Correção: usar `import * as http from 'http'` (import do namespace)
 */

// exemplo-conectar-api.ts (versão didática com fetch)
// Este exemplo demonstra:
// 1) GET /ping
// 2) POST /auth/login -> obtém token
// 3) POST /reservas -> cria reserva usando o token no header Authorization
// Requisito: Node 18+ com fetch global. Se usar Node <18, instale `node-fetch`.

// Para executar:
// npx ts-node exemplos/exemplo-conectar-api.ts

// Helper: faz fetch e tenta parsear JSON, senão retorna texto
async function fetchJson(url: string, options?: any) {
  const res = await (globalThis as any).fetch(url, options);
  let body: any;
  try {
    body = await res.json();
  } catch {
    body = await res.text();
  }
  return { status: res.status, body };
}

async function main() {
  try {
    console.log('==> 1) GET /ping');
    const ping = await fetchJson('http://localhost:3000/ping');
    console.log('Status:', ping.status);
    console.log('Body:', ping.body);

    console.log('\n==> 2) POST /auth/login (tenta obter token)');
      // Exemplo: credenciais que estavam falhando (comentadas):
      // const credenciais = { email: 'teste@exemplo.com', senha: '123456' };
      // Usuários seed criados automaticamente no projeto (veja src/database/database.ts):
      // - admin@example.com / admin123
      // - user@example.com  / user123
      // Usaremos o admin neste exemplo para garantir que o login funcione.
      const credenciais = { email: 'admin@exemplo.com', senha: 'admin123' };
    const login = await fetchJson('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciais),
    });
    console.log('Status:', login.status);
    console.log('Body:', login.body);

    // Se o login deu certo e retornou token, usamos para criar reserva
    const token = login.body && (login.body.token || login.body.token);
    if (!token) {
      console.log('\nNenhum token obtido — não será possível criar reserva.');
      return;
    }

    console.log('\n==> 3) POST /reservas (criar reserva usando token)');
    const reserva = { sala: 'Sala A', data: new Date().toISOString() };
    const criar = await fetchJson('http://localhost:3000/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reserva),
    });
    console.log('Status:', criar.status);
    console.log('Body:', criar.body);

    console.log('\nPronto — se o status for 200 e Body conter id, a reserva foi criada.');
  } catch (err: any) {
    console.error('Erro no exemplo:', err.message || err);
  }
}

main();

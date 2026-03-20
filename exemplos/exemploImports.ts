//  Importando default + named juntos
import multiplicarFunc, { soma as somaFunc, subtrai as subtraiFunc } from "./exemploLib.ts"

// ===============================
//  USO
// ===============================

console.log("Soma:", somaFunc(2, 3))          // 5
console.log("Subtração:", subtraiFunc(5, 2))  // 3
console.log("Multiplicação:", multiplicarFunc(2, 3)) // 6



// ===============================
//  EXEMPLOS DE ERRO (comentados)
// ===============================

// Errado: soma não é default
// import soma from "./exemploCompleto"

// Errado: multiplicar é default, não named
// import { multiplicar } from "./exemploCompleto"


//Compilar e rodar: npx tsc exexemploimports.ts 
// então node ex-imports.js


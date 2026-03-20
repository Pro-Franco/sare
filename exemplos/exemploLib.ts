// ===============================
//  EXPORTS (simulando uma lib)
// ===============================

// Named exports
export const soma = (a: number, b: number) => a + b
export const subtrai = (a: number, b: number) => a - b

// Default export
export default function multiplicar(a: number, b: number) {
  return a * b
}

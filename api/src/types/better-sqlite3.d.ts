declare module "better-sqlite3" {
  interface RunResult {
    changes: number
    lastInsertRowid: number
  }

  interface Statement<T=any> {
    run(...params: any[]): RunResult
    get(...params: any[]): T
    all(...params: any[]): T[]
    bind(...params: any[]): this
  }

  class Database {
    constructor(filename: string)
    prepare(sql: string): Statement
    exec(sql: string): void
    close(): void
  }

  export default Database
}

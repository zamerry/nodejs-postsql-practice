import {Pool} from "pg"

const pool = new Pool({
    user: "postgres",
    password: "zamerry",
    host: "localhost",
    port: 5432,
    database: "node_sql"
})

export default pool
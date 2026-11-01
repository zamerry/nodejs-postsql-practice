import {Pool} from "pg"

const pool = new Pool({
    user: process.env.db_user,
    password: process.env.db_password,
    host: "localhost",
    port: 5432,
    database: process.env.db_name
})

export default pool
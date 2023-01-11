import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_URL,
});

  export default function query(text, params) {
    return pool.query(text, params);
  }
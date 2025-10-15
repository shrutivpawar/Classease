const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",          // your PostgreSQL username
  host: "localhost",         // your host
  database: "classease",     // your database name
  password: "123456",        // your password
  port: 5432,                // default port
});

module.exports = pool;

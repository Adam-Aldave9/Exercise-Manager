const Pool = require("pg").Pool;

const pool = new Pool({
  user: <ENTER RDS USER HERE>,
  password: <ENTER PASSWORD HERE>,
  host: <ENTER RDS CONNECTION LINK>,
  port: <PORT NUMBER>,
  database: <RDS DATABASE NAME>,
  ssl: {
            rejectUnauthorized: false
        }
});

module.exports = pool;
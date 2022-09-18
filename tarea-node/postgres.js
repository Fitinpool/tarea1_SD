const postgres = require('postgres');

const sql = postgres('postgres://user:user@172.20.0.2:5432/tarea1', {
  host                 : '172.20.0.2',            // Postgres ip address[s] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  database             : 'tarea1',            // Name of database to connect to
  username             : 'user',            // Username of database user
  password             : 'user',            // Password of database user
})

module.exports = sql;
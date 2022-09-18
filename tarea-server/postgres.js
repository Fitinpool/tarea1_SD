const postgres = require('postgres');

const sql = postgres('postgres://user:user@172.18.0.2:5432/tarea1')

module.exports = sql;
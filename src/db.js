const mysql = require('mysql2');
const { promisify }= require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Failed to establish connection with the database', err);
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

//promisify
pool.query = promisify(pool.query);

module.exports = pool;

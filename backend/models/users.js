const pool = require('../db/pool');

const users = {
  findAll: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.query('SELECT * FROM users', (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  create: (user) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.query('INSERT INTO users SET ?;', user, (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  findByEmail: (email) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query('SELECT * FROM users WHERE email LIKE ?;', email, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  reset: (email, password) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      } 
      console.log(email, password);
      connection.query('UPDATE users SET password = ? WHERE email = ?;', [password, email], (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),




};

module.exports = users;

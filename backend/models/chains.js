const pool = require('../db/pool');

const chains = {
  findAll: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }

      connection.query('SELECT * FROM chains;', (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findChainById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('SELECT * FROM chains WHERE id=?;', id, (err, result) => {
        console.log(result);
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findByChainId: (chain) => new Promise((resolve, reject) => {
    console.log("käykö se täällä");
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
        const selectQuery = 'SELECT * FROM chains WHERE chain_id = ?;';
        connection.query(selectQuery,[chain.chainId], (err, result) => {
          connection.release();
          if(err) {
            return reject(err);
          }
          resolve(result);
        });
    });
  }),
  create: (chain) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }

      const query = connection.query('INSERT INTO chains SET ?;', chain, (err, result) => {
        connection.release();
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  deleteById: (id) => new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM chain WHERE id=?;';
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }

      connection.query(deleteQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  })
};

module.exports = chains;
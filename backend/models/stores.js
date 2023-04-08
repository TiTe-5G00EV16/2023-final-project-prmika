const pool = require('../db/pool');

const stores = {
  findAll: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }

      connection.query('SELECT chains.chain_name, stores.name, stores.image FROM stores, chains WHERE stores.chain = chains.chain_id', (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findStoreById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('SELECT chains.chain_name, stores.name, stores.image FROM stores, chains WHERE stores.chain = chains.chain_id   AND stores.id=?;', id, (err, result) => {
        console.log(result);
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findByStore: (store) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
        const selectQuery = 'SELECT * FROM stores WHERE chain = ? AND name like ?;';
        connection.query(selectQuery,[store.chain, store.name], (err, result) => {
          connection.release();
          if(err) {
            return reject(err);
          }
          resolve(result);
        });
    });
  }),
  create: (store) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }

      const query = connection.query('INSERT INTO stores SET ?;', store, (err, result) => {
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
    const deleteQuery = 'DELETE FROM stores WHERE id=?;';
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

module.exports = stores;
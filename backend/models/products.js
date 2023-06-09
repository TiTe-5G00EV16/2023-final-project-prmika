const pool = require('../db/pool');

const products = {
  findAll: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.query('SELECT p.id, p.title, p.description, p.image, p.price, p.owner, u.name FROM products AS p JOIN users AS u ON u.id = p.owner', (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findProductById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query('SELECT p.id, p.title, p.description, p.image, p.price, u.name FROM products AS p JOIN users AS u ON u.id = p.owner WHERE p.id=?;', id, (err, result) => {
        console.log(result);
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findByOwner: (owner) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      const selectQuery = 'SELECT p.id, p.title, p.description, p.image, p.price, u.name FROM products AS p JOIN users AS u ON u.id = p.owner WHERE owner = ?;';
      connection.query(selectQuery, [owner], (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      const selectQuery = 'SELECT * FROM products WHERE id = ?;';
      connection.query(selectQuery, [id], (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  create: (product) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      const query = connection.query('INSERT INTO products SET ?;', product, (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  update: (product) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      const query = connection.query('UPDATE products SET title = ?, description = ?, image = ?, price = ? WHERE id = ?;', [product.title, product.description, product.image, product.price, product.id], (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  deleteById: (id) => new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM products WHERE id=?;';
    pool.getConnection((err, connection) => {
      if (err) {
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

module.exports = products;
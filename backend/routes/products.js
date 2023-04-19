const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { createProduct, deleteProduct, getProducts, getProductById, getProductByOwnerId, getProductsByOwner } = require('../controllers/products');

router.get('/', getProducts);
router.get('/:owner', getProductByOwnerId);
router.get('/id/:id', getProductById);


router.use(verifyToken);

router.post('/', createProduct);
router.delete('/:id', deleteProduct);


module.exports = router;

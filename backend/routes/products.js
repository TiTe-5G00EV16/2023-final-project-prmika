const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { createProduct, deleteProduct, getProducts, getProductById, getProductByOwnerId, getProductsByOwner,  updateProduct } = require('../controllers/products');

router.get('/', getProducts);
router.get('/owner/:owner', getProductByOwnerId);
router.get('/id/:id', getProductById);


router.use(verifyToken);

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


module.exports = router;

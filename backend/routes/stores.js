const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { createStore, deleteStore, getStores, getStoreById, getStoreByName } = require('../controllers/stores');

router.get('/', getStores);
router.get('/:id', getStoreById);
//router.get('/:chain', getStoreByName);

//router.use(verifyToken);

router.post('/', createStore);
router.delete('/:id', deleteStore);


module.exports = router;

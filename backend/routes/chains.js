const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { createChain, deleteChain, getChains, getChainById, getChainByChainId } = require('../controllers/chains');

router.get('/', getChains);
router.get('/:id', getChainById);
router.get('/chain/:chainId', getChainByChainId);

//router.use(verifyToken);

router.post('/', createChain);
router.delete('/:id', deleteChain);


module.exports = router;

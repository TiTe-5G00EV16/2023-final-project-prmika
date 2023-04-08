const Joi = require('joi');
const stores = require('../models/stores');
const chains = require('../models/chains');

const getStores = async (req, res) => {
  try {
    const response = await stores.findAll();
    if(response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};


const getStoreById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await stores.findStoreById(id);
    if(response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createStore = async (req, res) => {
  const schema = Joi.object({
    chain: Joi.number().integer().positive().required(),
    name: Joi.string().min(4).required(),
    image: Joi.string()
  });

  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const store = {
    chain: parseInt(req.body.chain),
    name: req.body.name,
    image: req.body.image
  }
  const chain = {
    chainName: '',
    chainId: parseInt(req.body.chain)
  }

  try {
    const result = await stores.findByStore(store);
    if(result.length > 0) {
      res.status(400).send('Store is in the database already');
      return;
    }
    const result2 = await chains.findByChainId(chain);
    console.log(result2.length);
    if(result2.length < 1) {
      res.status(400).send("Chain doesn't exist");
      return;
    }
    const response = await stores.create(store);
    if(response) {
      store.id = response.insertId;
      res.status(201).send(store);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const deleteStore = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await stores.deleteById(id);
    if(response) {
      res.status(200).send('Store deleted');
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const getStoreByName = async (req, res) => {
    try {
      const store = {
    chain: parseInt(req.body.chain),
    name: req.body.name,
    image: req.body.image
  }
    const response = await stores.findByStore(store);
    if(response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

module.exports = {
  createStore,
  getStoreById,
  deleteStore,
  getStoreByName,
  getStores
};
const Joi = require('joi');
const chains = require('../models/chains');

const getChains = async (req, res) => {
  try {
    const response = await chains.findAll();
    if(response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};


const getChainById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await chains.findChainById(id);
    if(response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createChain = async (req, res) => {
  const schema = Joi.object({
    chainName: Joi.string().min(4).required(),
    chainId: Joi.number().integer().positive().required(),
  });

  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const chain = {
    chainName: req.body.chainName,
    chainId: parseInt(req.body.chainId),
  }

  try {
    const result = await chains.findByChainId(chain);
    if(result.length > 0) {
      res.status(400).send('Chain is in the database already');
      return;
    }
    const response = await chains.create(chain);
    if(response) {
      chain.id = response.insertId;
      res.status(201).send(chain);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const deleteChain = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await chains.deleteById(id);
    if(response) {
      res.status(200).send('Chain deleted');
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const getChainByChainId = async (req, res) => {
    try {
      
      const chain = {
        chainName: '',
        chainId: parseInt(req.params.chainId),
  }
    const response = await chains.findByChainId(chain);
    if(response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

module.exports = {
  createChain,
  getChainById,
  deleteChain,
  getChainByChainId,
  getChains
};
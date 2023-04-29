const Joi = require('joi');
const products = require('../models/products');

const getProducts = async (req, res) => {
  try {
    const response = await products.findAll();
    if(response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};


const getProductByOwnerId = async (req, res) => {
  try {
    const owner = req.params.owner;
    const response = await products.findByOwner(owner);
    if(response.length === 1) {
      res.send(response);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await products.findById(id);
    if(response.length === 1) {
      res.send(response);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createProduct = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number().positive().required(),
    owner:Joi.string().min(4).required()
  });

  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const product = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: parseInt(req.body.price),
    owner: req.body.owner,
  }

  try {
    const response = await products.create(product);
    if(response) {
      product.id = response.insertId;
      res.status(201).send(product);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
const updateProduct = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number().positive().required(),
    id: Joi.number(),
  });
  
  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  console.log(req);
  
  const product = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: parseInt(req.body.price),
    id: parseInt(req.params.id),
  }
  console.log(product);
  
  try {
    const response = await products.update(product);
    if(response) {
      product.id = response.insertId;
      res.status(204).send(product);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await products.deleteById(id);
    if(response) {
      res.status(200).send('Product deleted');
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const getProductsByOwner = async (req, res) => {
    try {
      const product = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: parseInt(req.body.price),
        owner: req.body.owner,
      }
    const response = await products.findByOwner(product);
    if(response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

module.exports = {
  createProduct,
  getProductById,
  getProductByOwnerId,
  deleteProduct,
  getProductsByOwner,
  getProducts,
  updateProduct
};
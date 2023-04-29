import React, { useContext, useRef, useState } from "react";
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/card/Card';
import Button from '../../shared/components/button/Button';
import Modal from '../../shared/components/modal/Modal';

import { AuthContext } from '../../shared/context/auth-context';
import { deleteProduct, updateProduct } from "../api/products";

import './ProductItem.css';
import Input from "../../shared/components/input/Input";

const ProductItem = props => {
  const auth = useContext(AuthContext);


  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [image, setImage] = useState(props.image);
  const [price, setPrice] = useState(props.price);


  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const showUpdateHandler = () => setShowUpdateModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);
  const cancelUpdateHandler = () => setShowUpdateModal(false);

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    console.log(props);
    deleteProductMutation.mutate({
      id: props.id,
      token: auth.token
    })
  }


  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdate = () => {
    updateProductMutation.mutate({
      title: title,
      description: description,
      image: image,
      price: price,
      id: props.id,
      token: auth.token
    });
    setShowUpdateModal(false);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelConfirmationHandler}>Cancel</Button>
            <Button delete onClick={deleteConfirmedHandler}>Delete</Button>
          </>
        }
      >
        <p>Are you sure? Once it's gone, it's gone!</p>
      </Modal>
      <Modal
        show={showUpdateModal}
        header=""
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Input id="title" type="text" label="Product name" onChange={event => handleTitleChange(event)} placeholder={props.title} value={title} />
            <Input id="description" type="text" label="Product description" onChange={event => handleDescriptionChange(event)} placeholder={props.description} value={description} />
            <Input id="image" type="text" label="Image Link" onChange={event => handleImageChange(event)} placeholder={props.image} value={image} />
            <Input id="price" type="number" label="Price" onChange={event => handlePriceChange(event)} placeholder={props.price} value={price} />
            <Button id="update-product" onClick={handleUpdate}>
              Update Product
            </Button>
            <Button inverse onClick={cancelUpdateHandler}>Cancel</Button>
          </>
        }
      >
      </Modal>

      <li className="product-item" key={props.id}>
        <Card className="product-item__content">
          <div className="product-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="product-item__info">
            <h3>
              {props.title} - {props.price}€
            </h3>
            <p>
              {props.description}
            </p>
            <p>
              {props.name}
            </p>
          </div>
          <div className="product-item_actions">
            {auth.isLoggedIn && (

              <Button danger onClick={showConfirmationHandler}>Delete</Button>
            )}
            {auth.isLoggedIn && (

              <Button onClick={showUpdateHandler}>Edit</Button>
            )}
          </div>
        </Card>
      </li>
    </>
  )
};

export default ProductItem;
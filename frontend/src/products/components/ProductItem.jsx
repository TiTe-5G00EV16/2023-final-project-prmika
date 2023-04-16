import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/card/Card';
import Button from '../../shared/components/button/Button';
import Modal from '../../shared/components/modal/Modal';

import { AuthContext } from '../../shared/context/auth-context';
import { deleteProduct } from "../api/products";

import './ProductItem.css';

const ProductItem = props => {
  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

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
    deleteProductMutation.mutate({
      id: props.id,
      token: auth.token
    })
  }

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

      <li className="product-item" key={props.id}>
          <Card className="product-item__content">
            <div className="product-item__image">
              <img src={props.image} alt={props.title} />
            </div>
            <div className="product-item__info">
              <h3>
                  {props.title} - {props.price}
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
            </div>
          </Card>
      </li>
    </>
  )
};

export default ProductItem;
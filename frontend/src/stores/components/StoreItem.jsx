import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/card/Card';
import Button from '../../shared/components/button/Button';
import Modal from '../../shared/components/modal/Modal';

import { AuthContext } from '../../shared/context/auth-context';
import { deleteStore } from "../api/stores";

import './StoreItem.css';

const StoreItem = props => {
  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const deleteStoreMutation = useMutation({
    mutationFn: deleteStore,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    deleteStoreMutation.mutate({
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

      <li className="store-item" key={props.id}>
        <Link to="/cities">
          <Card className="store-item__content">
            <div className="store-item__image">
              <img src={props.image} alt={props.name} />
            </div>
            <div className="store-item__info">
              <h3>
                  {props.name} - {props.chain_name}
              </h3>
            </div>
            <div className="store-item_actions">
              {auth.isLoggedIn && (
                <Button danger onClick={showConfirmationHandler}>Delete</Button>
                )}
            </div>
          </Card>
        </Link>
      </li>
    </>
  )
};

export default StoreItem;
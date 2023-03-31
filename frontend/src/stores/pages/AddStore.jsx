import { useRef, useContext } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import './AddStore.css';

import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button';
import { AuthContext } from '../../shared/context/auth-context';

import { createStore } from '../api/stores';
import Select from '../../shared/components/select/input/Select';

const AddStore = () => {
  const chainRef = useRef();
  const nameRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();

  const createStoreMutation = useMutation({
    mutationFn: createStore
  })

  const storeSubmitHandler = (event) => {
    event.preventDefault();
    createStoreMutation.mutate({
      chain: chainRef.current.value,
      name: nameRef.current.value,
      image: imageRef.current.value,
      token: auth.token
    })
    history.push('/');
  }
  

  return (
    <form className='store-form' onSubmit={storeSubmitHandler}>
      <Input id="name" ref={nameRef} type="text" label="Store name" />
      <Select id="chain" ref={chainRef} type="number" label="Chain number" />
      <Input id="image" ref={imageRef} type="text" label="Image Link" />
      <Button id="add-store">
        Add Store
      </Button>
    </form>
  )
};

export default AddStore;
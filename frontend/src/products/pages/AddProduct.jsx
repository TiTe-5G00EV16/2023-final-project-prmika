import { useRef, useContext } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import './AddProduct.css';

import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button';
import { AuthContext } from '../../shared/context/auth-context';

import { createProduct } from '../api/products';

const AddProduct = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const priceRef = useRef();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const createProductMutation = useMutation({
    mutationFn: createProduct
  })

  const productSubmitHandler = (event) => {
    event.preventDefault();
    createProductMutation.mutate({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      price: priceRef.current.value,
      owner: auth.userId,
      token: auth.token
    })
    history.push('/');
  }
  

  return (
    <form className='product-form' onSubmit={productSubmitHandler}>
      <Input id="title" ref={titleRef} type="text" label="Product name" required/>
      <Input id="description" ref={descriptionRef} type="text" label="Product description" />
      <Input id="image" ref={imageRef} type="text" label="Image Link" />
      <Input id="price" ref={priceRef} type="number" label="Price" />
      <Button id="add-product">
        Add Product
      </Button>
    </form>
  )
};

export default AddProduct;
import React, { useRef } from "react";
import { useQuery } from 'react-query'
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import { getProducts } from "../api/products";
import ProductsList from "../components/ProductsList";
import Input from "../../shared/components/input/Input";
import Select from "../../shared/components/select/input/Select";
import Button from "../../shared/components/button/Button";

const Products = () => {
  const ownerRef = useRef();
  const inputRef = useRef();
 

  const {isLoading, error, data } = useQuery(
    "productsData",
    getProducts
  );
  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />
    </div>
  );
  if (error) return "An error has occurred: " + error.message;

  const filterProductsHandler = () => {
          console.log(inputRef);
          console.log(ownerRef);
  }
  

  return (
    <>
    {/* {

    <form className='product-form' onSubmit={filterProductsHandler}>
    <br/>
    </form>
  <Select ref={ownerRef} id="owner"/>
  } */}
  <Select ref={ownerRef} />
  <Input  id="search" ref={inputRef} type="text" label="Search" placeholder="hae tuotteita" />
  <Button onClick={filterProductsHandler}>Hae</Button>

    <ProductsList items={data} />
    </>
    
  ) 
}

export default Products;
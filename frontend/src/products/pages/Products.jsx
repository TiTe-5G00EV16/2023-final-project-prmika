import React, { useRef } from "react";
import { useQuery } from 'react-query'
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import { getProducts } from "../api/products";
import ProductsList from "../components/ProductsList";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";

const Products = () => {
  
 

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

 

  return (
    <>
    
  <Input id="search" type="text" label="Search" placeholder="search products (does not work)" />
  <Button>Hae</Button>

    <ProductsList items={data} /> 
    </>
    
  ) 
}

export default Products;
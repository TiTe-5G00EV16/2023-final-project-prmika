import React, { useContext } from "react";
import { useMutation, useQuery } from 'react-query'
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import { getProductsByOwner } from "../api/products";
import ProductsList from "../components/ProductsList";
import { AuthContext } from "../../shared/context/auth-context";

const OwnProducts = () => {
  const auth = useContext(AuthContext);
  const ownProductsMutation = useMutation({
    mutationFn: getProductsByOwner
  })

  const productSubmitHandler = (event) => {
    ownProductsMutation.mutate({
      id: auth.userId,
    })
  }
  const {isLoading, error, data } = useQuery(
    "ownProductsData",
    productSubmitHandler
  );
  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />
    </div>
  );
  if (error) return "An error has occurred: " + error.message;

  if (data) return console.log(data);

  return (

    <ProductsList items={data} />    
  ) 
}

export default OwnProducts;
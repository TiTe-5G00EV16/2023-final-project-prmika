import React, { useContext } from "react";
import { useMutation, useQuery } from 'react-query'
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import ProductsList from "../components/ProductsList";
import { AuthContext } from "../../shared/context/auth-context";

const OwnProducts = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, data } = useQuery("ownProductsData", () =>
    fetch(`${import.meta.env.VITE_API_URL}/api/products`).then((res) => res.json())
  );
  const filterByOwner = (items, ownerValue) => {
    return items.filter((item) => item.owner === ownerValue);
  };
  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />
    </div>
  );
  if (error) return "An error has occurred: " + error.message;

    const filteredItems = filterByOwner(data, auth.userId);
    return <ProductsList items={filteredItems} />;
 
};

export default OwnProducts;


 


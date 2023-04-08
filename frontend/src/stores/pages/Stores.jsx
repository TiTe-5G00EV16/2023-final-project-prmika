import React from "react";
import { useQuery } from 'react-query'
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import { getStores } from "../api/stores";
import StoresList from "../components/StoresList";

const Stores = () => {
  const {isLoading, error, data } = useQuery(
    "storesData",
    getStores
  );
  if (isLoading) return (
    <div className="center">
      <LoadingSpinner />
    </div>
  );
  if (error) return "An error has occurred: " + error.message;

  return (
    <StoresList items={data}/>
    
  ) 
}

export default Stores;
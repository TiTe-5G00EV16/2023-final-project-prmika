
import React from "react";
import {useQuery} from 'react-query';
import CitiesList from '../components/CitiesList';



const Cities = () => {

const { isLoading, error, data } = useQuery("citiesData", () =>
fetch(
  "http://localhost:5000/api/cities"
).then((res) => res.json())
);
  
if (isLoading) return "Loading...";

if (error) return "An error has occurred: " + error.message;


return (
    <CitiesList items={data} />
  )
};

export default Cities;


import React, {useRef} from "react";
import { useMutation } from "react-query";

import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import { createCity } from "../api/cities";

import './AddCity.css';

const AddCity = () => {
  const capitalRef = useRef();
  const countryRef = useRef();
  const imageRef = useRef();

  const createCityMutation = useMutation({
    mutationFn: createCity
  });

  const citySubmitHandler = async event => {
    event.preventDefault();
    createCityMutation.mutate({
      capital: capitalRef.current.value,
      country: countryRef.current.value,
      image: imageRef.current.value
    })
  };

  return (
    <form className="city-form" onSubmit={citySubmitHandler}>
      <Input id="capital" ref={capitalRef} type="text" label="Capital" />
      <Input id="country" ref={countryRef} type="text" label="Country" />
      <Input id="image" ref={imageRef} type="text" label="Image Link" />
      <Button type="submit">
        Add City
      </Button>
    </form>
  )
};

export default AddCity;
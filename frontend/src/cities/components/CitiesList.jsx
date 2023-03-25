
import React from "react";
import CityItem from './CitiesItem';
import './CitiesList.css';
const CitiesList = props => {

if (props.items.length === 0) {
  return (
    <div className="center">
      <h2>No cities found.</h2>
    </div>
  );
}
  return <ul className="cities-list">
    {props.items.map(city =>
      <CityItem
        key={city.id}
        capital={city.capital}
        country={city.country}
        image={city.image}
      />
    )}
  </ul>
};
export default CitiesList;
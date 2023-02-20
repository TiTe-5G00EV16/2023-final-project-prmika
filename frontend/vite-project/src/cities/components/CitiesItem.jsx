
import React from "react";
import Card from "../../shared/components/card/Card";
import './CitiesItem.css';
const CityItem = props => {
  return <li className="city-item">
    <Card className="city-item__content">

     <div className="city-item__image">
      <img src={props.image} alt={props.capital} />
    </div>
    <div className="city-item__info">
      <h3>{props.capital} - {props.country}</h3>
    </div>
    <div className="city-item_actions">
      <button>Edit</button>
      <button>Delete</button>
    </div>
    </Card>
  </li>
};
export default CityItem;
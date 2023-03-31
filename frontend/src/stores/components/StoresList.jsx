
import React from "react";
import StoreItem from './storeItem';
import './StoresList.css';
const StoresList = props => {

if (props.items.length === 0) {
  return (
    <div className="center">
      <h2>No stores found.</h2>
    </div>
  );
}
  return <ul className="stores-list">
    {props.items.map(store =>
      <StoreItem
        key={store.id}
        chain={store.chain_name}
        name={store.name}
        image={store.image}
      />
    )}
  </ul>
};
export default StoresList;
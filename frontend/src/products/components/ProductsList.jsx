
import React from "react";
import ProductItem from './ProductItem';
import './ProductsList.css';
const ProductsList = props => {

if (props.items.length === 0) {
  return (
    <div className="center">
      <h2>No Products found.</h2>
    </div>
  );
}
  return <ul className="products-list">
    {props.items.map(product =>
      <ProductItem
        key={product.id}
        title={product.title}
        description={product.description}
        image={product.image}
        price={product.price}
        name={product.name}
      />
    )}
  </ul>
};
export default ProductsList;
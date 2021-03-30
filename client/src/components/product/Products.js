import React from "react";
import Pagination from "../common/Pagination";
import ProductCard from "./ProductCard";

function Products(props) {
  return (
    <>
      {/* Display products list */}
      <div className="row d-flex justify-content-start">
        {props.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* pagination for products list */}
      <div className="me-5">
        <Pagination pages={props.pages} page={props.page} baseUrl="/home" />
      </div>
    </>
  );
}

export default Products;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../redux/actions/product";
import { getKeyWord } from "../../util";
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
      <div className="row mt-3 justify-content-end mx-5">
        <div className="col-auto">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                <span>&laquo;</span>
              </a>
            </li>
            {[...Array(props.pages).keys()].map((p) => (
              <li class="page-item">
                <Link className="page-link" to={`/home?currPage=${p + 1}`}>
                  {p + 1}
                </Link>
              </li>
            ))}

            <li class="page-item">
              <a class="page-link" href="#">
                <span>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Products;

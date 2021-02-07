import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../common/LoadingBox";
import MessageBox from "../../common/MessageBox";
import Rating from "../../common/Rating";
import { fetchProductDetail } from "../../../redux/actions/product";

import "./ProductDetail.css";
import ProductContent from "./productContent/ProductContent";
import AddToCart from "./addToCart/AddToCart";

function ProductDetail(props) {
  // const product = data.products.find((p) => p._id === props.match.params.id);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Go Back</Link>
          <div className="row top">
            <ProductContent product={product} />

            <AddToCart
              product={product}
              qty={qty}
              setQty={setQty}
              addToCartHandler={addToCartHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;

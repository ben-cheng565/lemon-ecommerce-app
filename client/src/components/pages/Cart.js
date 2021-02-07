import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cart";

function Cart(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      {productId} : {qty}
    </div>
  );
}

export default Cart;

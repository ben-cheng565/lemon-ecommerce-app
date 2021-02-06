import React, { useEffect } from "react";
import Product from "../Product";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/product";

function Home() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products);
  const { products, loading, error } = productData;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

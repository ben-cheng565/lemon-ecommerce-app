import React, { useEffect } from "react";
import Product from "../components/product/Product";
import LoadingBox from "../components/common/LoadingBox";
import MessageBox from "../components/common/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/product";
import { Link } from "react-router-dom";
import { getKeyWord } from "../util";

function Home(props) {
  const dispatch = useDispatch();
  let search = props.location.search;
  const currPage = getKeyWord(search, "currPage");
  const productData = useSelector((state) => state.products);
  const { products, loading, error, page, pages } = productData;

  useEffect(() => {
    dispatch(fetchProducts({ currPage }));
  }, [dispatch, currPage]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((p) => (
              <Link
                className={p + 1 === page ? "active" : ""}
                to={`/home?currPage=${p + 1}`}
              >
                {p + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

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
          <div className="row pt-5 m-auto" style={{ width: "50%" }}>
            {/* It is more reasonable to move the search box from navbar to home page */}
            <form className="d-flex justify-content-center">
              <input
                className="form-control me-2 col-9"
                type="search"
                placeholder="Search"
                style={{ cursor: "text" }}
              />
              <button
                className="btn btn-outline-success col-3 ms-2"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          {/* Display products list */}
          <div className="container p-3">
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>

            {/* pagination for products list */}
            <nav className="row float-end">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#">
                    <span>&laquo;</span>
                  </a>
                </li>
                {[...Array(pages).keys()].map((p) => (
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
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

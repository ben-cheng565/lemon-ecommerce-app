import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import ProductCard from "../../components/product/ProductCard";
import Product from "../../components/product/ProductCard";
import { fetchProducts } from "../../redux/actions/product";
import { getKeyWord } from "../../util";
import CategoryList from "./CategoryList";

function Search(props) {
  const dispatch = useDispatch();
  let search = props.location.search;
  const name = getKeyWord(search, "name");
  const category = getKeyWord(search, "category");
  const sort = getKeyWord(search, "sort");
  const currPage = getKeyWord(search, "currPage");
  //   const { name = "all" } = useParams();
  const { loading, error, products, page, pages, count } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(
      fetchProducts({
        currPage,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        sort,
      })
    );
  }, [dispatch, name, category, sort, currPage]);

  // generate url according to filter params
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || currPage;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const sortOrder = filter.sort || sort;
    return `/search?name=${filterName}&category=${filterCategory}&sort=${sortOrder}&currPage=${filterPage}`;
  };

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <h1>Found {count} Results</h1>
          </div>
        )}
        <div>
          {/* Sort by{" "} */}
          <select
            value={sort}
            onChange={(e) =>
              props.history.push(getFilterUrl({ sort: e.target.value }))
            }
          >
            <option value="none">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-2 ms-5 mt-2">
          <CategoryList category={category} getFilterUrl={getFilterUrl} />
        </div>
        <div className="col-9">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="container">
              <div className="row d-flex justify-content-start">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <div className="row mt-3 justify-content-end pe-3">
                <div className="col-auto">
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" href="#">
                        <span>&laquo;</span>
                      </a>
                    </li>
                    {[...Array(pages).keys()].map((p) => (
                      <li class="page-item">
                        <Link
                          className="page-link"
                          to={getFilterUrl({ page: p + 1 })}
                        >
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;

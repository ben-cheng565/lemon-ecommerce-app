import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import Product from "../../components/product/Product";
import { fetchProducts } from "../../redux/actions/product";
import { getKeyWord } from "../../util";
import CategoryList from "./CategoryList";

function Search(props) {
  const dispatch = useDispatch();
  let search = props.location.search;
  const name = getKeyWord(search, "name");
  const category = getKeyWord(search, "category");
  const sort = getKeyWord(search, "sort");
  //   const { name = "all" } = useParams();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      fetchProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        sort,
      })
    );
  }, [dispatch, name, category, sort]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const sortOrder = filter.sort || sort;
    return `/search?name=${filterName}&category=${filterCategory}&sort=${sortOrder}`;
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
            <h1>Found {products.length} Results</h1>
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
      <div className="row top">
        <div className="col-1">
          <CategoryList category={category} getFilterUrl={getFilterUrl} />
        </div>
        <div className="col-3">
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
      </div>
    </div>
  );
}

export default Search;

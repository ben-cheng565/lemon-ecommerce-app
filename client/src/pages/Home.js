import React, { useEffect, useState } from "react";
import LoadingBox from "../components/common/LoadingBox";
import MessageBox from "../components/common/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/product";
import { getKeyWord } from "../util";
import CategoryList from "../components/product/CategoryList";
import Products from "../components/product/Products";
import SearchBox from "../components/search/SearchBox";
import SortBy from "../components/common/SortBy";

function Home(props) {
  const dispatch = useDispatch();
  let search = props.location.search;
  const searchName = getKeyWord(search, "name");
  const category = getKeyWord(search, "category");
  const sort = getKeyWord(search, "sort");
  const currPage = getKeyWord(search, "currPage");
  const productData = useSelector((state) => state.products);
  const { products, loading, error, page, pages } = productData;

  // the default keyword is "all"
  const [name, setName] = useState("all");
  console.log(sort);
  useEffect(() => {
    if (searchName === "all") {
      setName("all");
    }

    dispatch(
      fetchProducts({
        category: category !== "all" ? category : "",
        currPage,
        name: searchName !== "all" ? searchName : "",
        sort,
      })
    );
  }, [dispatch, currPage, category, sort, searchName]);

  const handleSearch = (e) => {
    e.preventDefault();

    props.history.push(`/home?name=${name}`);
  };

  const handleSortChange = (e) => {
    e.preventDefault();

    props.history.push(getFilterUrl({ sort: e.target.value }));
  };

  // generate url according to filter params
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || currPage;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const sortOrder = filter.sort || sort;

    return `/home?name=${filterName}&category=${filterCategory}&sort=${sortOrder}&currPage=${filterPage}`;
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row">
            <div className="col-2 ms-5 mt-5">
              <CategoryList category={category} getFilterUrl={getFilterUrl} />
            </div>

            <div className="col-9 container ">
              <SearchBox
                name={name}
                setName={setName}
                handleSearch={handleSearch}
              />

              <SortBy sort={sort} handleSortChange={handleSortChange} />

              <Products
                products={products}
                pages={pages}
                page={page}
                getFilterUrl={getFilterUrl}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

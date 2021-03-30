import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../common/LoadingBox";
import MessageBox from "../common/MessageBox";
import { getProductCategories } from "../../redux/actions/product";

function CategoryList(props) {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.categoryList
  );

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  return (
    <div className="card" /* style={{ backgroundColor: "#f4f4f4" }} */>
      <div className="card-header">
        <span className="fs-5">Categories</span>
      </div>
      <div className="card-body">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul class="list-group list-group-flush">
            <li key="all" class="list-group-item">
              <Link
                className={"All" === props.category ? "active" : ""}
                to={props.getFilterUrl({ category: "all" })}
              >
                All
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c} className="list-group-item ms-2">
                <Link
                  className={c === props.category ? "active" : ""}
                  to={props.getFilterUrl({ category: c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CategoryList;

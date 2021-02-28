import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
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
    <div className="col-1" style={{ backgroundColor: "#f4f4f4" }}>
      <h4>Category</h4>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ul>
          {categories.map((c) => (
            <li key={c}>
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
  );
}

export default CategoryList;

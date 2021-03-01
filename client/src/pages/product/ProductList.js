import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
} from "../../redux/actions/product";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../../redux/actionTypes";
import { getKeyWord } from "../../util";

function ProductList(props) {
  let search = props.location.search;
  const currPage = getKeyWord(search, "currPage");
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products);
  const { products, loading, error, page, pages } = productData;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/edit/${createdProduct._id}`);
    }

    dispatch(fetchProducts({ currPage }));

    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [
    dispatch,
    createdProduct,
    props.history,
    successCreate,
    successDelete,
    currPage,
  ]);

  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        {loadingCreate && <LoadingBox />}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {successCreate && (
          <MessageBox variant="success">
            Product created successfully
          </MessageBox>
        )}
        {loadingDelete && <LoadingBox />}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {successDelete ? (
          <MessageBox variant="success">
            Product deleted successfully
          </MessageBox>
        ) : null}
        <button
          type="button"
          onClick={createHandler}
          style={{ width: "20rem", backgroundColor: "green" }}
        >
          Create New Product
        </button>
      </div>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th style={{ width: "15%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p._id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  <td>{p.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/edit/${p._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((p) => (
              <Link
                className={p + 1 === page ? "active" : ""}
                to={`/productlist?currPage=${p + 1}`}
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

export default ProductList;

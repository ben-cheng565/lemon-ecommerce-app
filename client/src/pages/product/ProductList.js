import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import {
  createProduct,
  deleteProduct,
  fetchProductList,
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
  const productData = useSelector((state) => state.productList);
  const { productList, loading, error, page, pages } = productData;
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

    dispatch(fetchProductList({ currPage }));

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
    // dispatch(createProduct());
    document.getElementsByClassName("toast").show();
  };

  return (
    <div className="container m-5">
      <div
        class="toast align-items-center text-white bg-primary border-0"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">Hello, world! This is a toast message.</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6 fs-4">Product List</div>

            <div className="col-6 d-flex justify-content-end">
              <button
                className="btn btn-outline-success btn-sm"
                type="button"
                onClick={createHandler}
              >
                Create New Product
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          {loadingCreate && <LoadingBox />}
          {errorCreate && (
            <MessageBox variant="danger">{errorCreate}</MessageBox>
          )}
          {successCreate && (
            <MessageBox variant="success">
              Product created successfully
            </MessageBox>
          )}
          {loadingDelete && <LoadingBox />}
          {errorDelete && (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          )}
          {successDelete ? (
            <MessageBox variant="success">
              Product deleted successfully
            </MessageBox>
          ) : null}
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((p) => (
                    <tr key={p._id}>
                      <td>{p._id}</td>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>{p.category}</td>
                      <td>{p.brand}</td>
                      <td className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm me-2"
                          style={{ width: "4rem" }}
                          onClick={() =>
                            props.history.push(`/product/edit/${p._id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          style={{ width: "4rem" }}
                          onClick={() => deleteHandler(p._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row mt-3 justify-content-end">
                <div className="col-auto">
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" href="#">
                        <span>&laquo;</span>
                      </a>
                    </li>
                    {[...Array(pages).keys()].map((p) => (
                      <li
                        class={
                          p + 1 === page ? "page-item active" : "page-item"
                        }
                      >
                        <Link
                          className="page-link"
                          to={`/productlist?currPage=${p + 1}`}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;

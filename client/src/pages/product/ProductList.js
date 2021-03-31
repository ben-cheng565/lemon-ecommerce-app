import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../components/common/Pagination";

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
      toast.success("Product created successfully.");
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/edit/${createdProduct._id}`);
    }

    dispatch(fetchProductList({ currPage }));

    if (successDelete) {
      toast.success("Product deleted successfully.");
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    if (errorCreate) {
      toast.error(errorCreate);
    }
    if (errorDelete) {
      toast.error(errorDelete);
    }
  }, [
    dispatch,
    createdProduct,
    props.history,
    successCreate,
    successDelete,
    currPage,
    errorDelete,
    errorCreate,
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
    <>
      <div>
        <ToastContainer position="bottom-right" />
      </div>
      <div className="container m-5">
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
                <Pagination pages={pages} page={page} baseUrl="/productlist" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;

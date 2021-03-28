import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import { deleteOrder, getOrderList } from "../../redux/actions/order";
import { ORDER_DELETE_RESET } from "../../redux/actionTypes";
import { getKeyWord } from "../../util";

function OrderList(props) {
  let search = props.location.search;
  const currPage = getKeyWord(search, "currPage");
  const orderData = useSelector((state) => state.orderList);
  const { orderList, loading, error, page, pages } = orderData;

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.orderDelete);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(getOrderList({ currPage }));
  }, [dispatch, successDelete, currPage]);

  const deleteHandler = (orderId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(orderId));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <div className="fs-4">Order List</div>
        </div>
        <div className="card-body">
          {loadingDelete && <LoadingBox />}
          {errorDelete && (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          )}
          {successDelete && (
            <MessageBox variant="success">
              Order deleted successfully
            </MessageBox>
          )}
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
                    <th>User</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.userId.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>

                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                      </td>
                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : "No"}
                      </td>
                      <td className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm me-2"
                          style={{ width: "4rem" }}
                          onClick={() => {
                            props.history.push(`/order/${order._id}`);
                          }}
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          style={{ width: "4rem" }}
                          onClick={() => deleteHandler(order._id)}
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

export default OrderList;

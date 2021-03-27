import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import { deleteOrder, getOrderList } from "../../redux/actions/order";
import { ORDER_DELETE_RESET } from "../../redux/actionTypes";

function OrderList(props) {
  const { orders, loading, error } = useSelector((state) => state.orderList);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.orderDelete);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(getOrderList());
  }, [dispatch, successDelete]);

  const deleteHandler = (orderId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(orderId));
    }
  };

  return (
    <div className="container m-5">
      <div className="card">
        <div className="card-header">
          <div className="fs-4">Orders</div>
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
                {orders.map((order) => (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderList;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import { getOrderHistory } from "../../redux/actions/order";
import { getKeyWord } from "../../util";

// import "./OrderHistory.css";

function OrderHistory(props) {
  let search = props.location.search;
  const currPage = getKeyWord(search, "currPage");
  const { orders, loading, error, page, pages } = useSelector(
    (state) => state.orderHistory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderHistory({ currPage }));
  }, [dispatch, currPage]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <span className="fs-4">Order History</span>
        </div>
        <div className="card-body">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
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
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            props.history.push(`/order/${order._id}`);
                          }}
                        >
                          Details
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
                          to={`/orderhistory?currPage=${p + 1}`}
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

export default OrderHistory;

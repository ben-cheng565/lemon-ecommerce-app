import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import { deleteUser, getUserList } from "../../redux/actions/user";
import { USER_DETAIL_RESET } from "../../redux/actionTypes";

function UserList(props) {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.userList);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.userDelete);

  useEffect(() => {
    dispatch(getUserList());
    dispatch({ type: USER_DETAIL_RESET });
  }, [dispatch, successDelete]);

  const editHandler = (userId) => {
    props.history.push(`/user/edit/${userId}`);
  };

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="container m-5">
      <div className="card">
        <div className="card-header">
          <div className="fs-4">User List</div>
        </div>
        <div className="card-body">
          {loadingDelete && <LoadingBox />}
          {errorDelete && (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          )}
          {successDelete && (
            <MessageBox variant="success">User deleted successfully</MessageBox>
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin?</th>
                  <th>Seller?</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u._id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.isAdmin ? "Yes" : "No"}</td>
                    <td>{u.isSeller ? "Yes" : "No"}</td>
                    <td className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm me-2"
                        style={{ width: "4rem" }}
                        onClick={() => editHandler(u._id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        style={{ width: "4rem" }}
                        onClick={() => deleteHandler(u._id)}
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

export default UserList;

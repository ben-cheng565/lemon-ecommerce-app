import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import { getUserList } from "../../redux/actions/user";

function UserList() {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const editHandler = (userId) => {};

  const deleteHandler = (userId) => {};

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin?</th>
              <th>Seller?</th>
              <th>Actions</th>
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
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => editHandler(u._id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
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
  );
}

export default UserList;

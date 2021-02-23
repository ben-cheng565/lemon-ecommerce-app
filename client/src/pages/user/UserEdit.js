import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import { editUser, getUserDetail } from "../../redux/actions/user";
import { USER_EDIT_RESET } from "../../redux/actionTypes";

function UserEdit(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = useSelector((state) => state.userEdit);
  const { userDetail, loading, error } = useSelector(
    (state) => state.userDetails
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET });
      props.history.push("/userlist");
    }

    if (!userDetail) {
      dispatch(getUserDetail(id));
    } else {
      setName(userDetail.name);
      setEmail(userDetail.email);
      setIsSeller(userDetail.isSeller);
      setIsAdmin(userDetail.isAdmin);
    }
  }, [dispatch, userDetail, id, successEdit, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(editUser({ _id: id, name, email, isSeller, isAdmin }));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loading && <LoadingBox />}
          {errorEdit && <MessageBox variant="danger">{errorEdit}</MessageBox>}
        </div>

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isSeller">Is Seller</label>
              <input
                id="isSeller"
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
              ></input>
            </div>
            <div>
              <button type="submit">Confirm</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default UserEdit;

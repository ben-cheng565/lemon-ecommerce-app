import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import { editUser, getUserDetail } from "../../redux/actions/user";
import { USER_EDIT_RESET } from "../../redux/actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("User updated successfully.");
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

    if (errorEdit) {
      toast.error(errorEdit);
    }
  }, [dispatch, userDetail, id, successEdit, props.history, errorEdit]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(editUser({ _id: id, name, email, isSeller, isAdmin }));
  };

  return (
    <>
      <div>
        <ToastContainer position="bottom-right" />
      </div>
      <div className="container my-5" style={{ width: "50%" }}>
        <div className="card shadow">
          <div className="card-header">
            <span className="fs-4">Edit User{/*  {name} */}</span>
          </div>
          <div className="card-body">
            <form className="mx-5" onSubmit={submitHandler}>
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      User Name
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="text"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>

                  <div className="row">
                    <div className="col-6 mb-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isAdmin"
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(!isAdmin)}
                        ></input>
                        <label className="form-check-label" htmlFor="isAdmin">
                          Is Admin
                        </label>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="isSeller">
                          Is Seller
                        </label>
                        <input
                          className="form-check-input"
                          id="isSeller"
                          type="checkbox"
                          checked={isSeller}
                          onChange={(e) => setIsSeller(isSeller)}
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="my-3 d-flex justify-content-end">
                    <button className="btn btn-primary me-2" type="submit">
                      Confirm
                    </button>
                    <button className="btn btn-secondary" type="button">
                      Close
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserEdit;

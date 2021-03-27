import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, updateUserProfile } from "../redux/actions/user";
import LoadingBox from "../components/common/LoadingBox";
import MessageBox from "../components/common/MessageBox";
import { USER_UPDATE_RESET } from "../redux/actionTypes";

function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { userDetail, loading, error } = useSelector(
    (state) => state.userDetails
  );
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.updateProfile);

  useEffect(() => {
    if (!userDetail) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(getUserDetail(userInfo._id));
    } else {
      setName(userDetail.name);
      setEmail(userDetail.email);
    }
  }, [dispatch, userInfo._id, userDetail]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and confirm password are not matched.");
    } else {
      dispatch(
        updateUserProfile({ userId: userDetail._id, name, email, password })
      );
    }
  };

  const handleClose = () => {
    props.history.push("/");
  };

  return (
    <div className="container my-5" style={{ width: "40%" }}>
      <div className="card shadow">
        <div className="card-header">
          <span className="fs-4">User Profile</span>
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
                    Name
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
                    Email
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
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="form-control"
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className="form-control"
                    id="confirmPassword"
                    type="password"
                    placeholder="Enter confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></input>
                </div>
                <div className="mt-3">
                  {loadingUpdate && <LoadingBox />}
                  {errorUpdate && (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                  )}
                  {successUpdate && (
                    <MessageBox variant="success">
                      Profile updated successfully.
                    </MessageBox>
                  )}
                </div>
                <div className="d-flex justify-content-end my-3">
                  <button className="btn btn-primary me-2" type="submit">
                    Update
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

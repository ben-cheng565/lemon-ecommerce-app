import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, updateUserProfile } from "../redux/actions/user";
import LoadingBox from "../components/common/LoadingBox";
import MessageBox from "../components/common/MessageBox";
import { USER_UPDATE_RESET } from "../redux/actionTypes";

function Profile() {
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

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox />}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile updated successfully.
              </MessageBox>
            )}
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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button type="submit">Update</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Profile;

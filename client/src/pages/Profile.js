import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../redux/actions/user";
import LoadingBox from "../components/common/LoadingBox";
import MessageBox from "../components/common/MessageBox";

function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { userDetail, loading, error } = useSelector(
    (state) => state.userDetails
  );

  useEffect(() => {
    dispatch(getUserDetail(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
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
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={userDetail.name}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Enter email"
                value={userDetail.email}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="text"
                placeholder="Enter password"
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="text"
                placeholder="Enter confirm password"
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

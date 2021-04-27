import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../../redux/actions/user";
import LoadingBox from "../../common/LoadingBox";
import MessageBox from "../../common/MessageBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import "./Signin.css";

function Signin(props) {
  const dispatch = useDispatch();
  // create states and set default values
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123");

  //   extract redirect page from url
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const { userInfo, loading, error, success } = useSelector(
    (state) => state.user
  );

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }

    if (error) {
      toast.error("Login failed: " + error);
    }

    if (success) {
      toast.success("Sign in successful");
    }
  }, [props.history, redirect, userInfo, error, success]);

  return (
    <>
      <div>
        <ToastContainer position="bottom-right" />
      </div>
      <div className="col-md-2"></div>
      <div
        className="container col-md-6 px-5 my-5" /*  style={{ width: "40%" }} */
      >
        <div className="card shadow">
          <div className="card-header">
            <span className="fs-4">Sign In</span>
          </div>
          <div className="card-body">
            <form className="mx-5" onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  required
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
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div>
              New customer?{" "}
              <Link to={`/signup?redirect=${redirect}`}>
                Create your account
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </>
  );
}

export default Signin;

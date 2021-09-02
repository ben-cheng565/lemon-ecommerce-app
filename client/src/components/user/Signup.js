import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signIn, signUp } from "../../redux/actions/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   extract redirect page from url
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const { userInfo, loading, error, success } = useSelector(
    (state) => state.user
  );

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warn("Password and confirm passwrod do not match.");
    } else {
      dispatch(signUp(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }

    if (error) {
      toast.error("Sign up failed: " + error);
    }

    if (success) {
      toast.success("Sign up successful");
    }
  }, [props.history, redirect, userInfo, error, success]);

  return (
    <>
      <div>
        <ToastContainer position="bottom-right" />
      </div>

      <div className="col-md-2"></div>
      <div
        className="container col-md-6 px-5 my-5"
      >
        <div className="card shadow">
          <div className="card-header">
            <span className="fs-4">Create Account</span>
          </div>

          <div className="card-body">
            <form className="mx-5" onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-control"
                  type="name"
                  id="name"
                  placeholder="Enter name"
                  required
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email Adress
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  required
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
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              
              <div className="mb-3">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter Confirm password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <div className="card-footer">
            <div>
              Already have an account?{" "}
              <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2"></div>
    </>
  );
}

export default Signin;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../../redux/actions/user";
import LoadingBox from "../../common/LoadingBox";
import MessageBox from "../../common/MessageBox";

import "./Signin.css";

function Signin(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123");

  //   extract redirect page from url
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const { userInfo, loading, error } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button type="submit">Sign In</button>
        </div>
        <div>
          <label />
          <div>
            New customer?{" "}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signin;

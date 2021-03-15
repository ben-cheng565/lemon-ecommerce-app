import React, { useState } from "react";

// import "./SearchBox.css";

function SearchBox(props) {
  const [name, setName] = useState("all");

  const submitHandler = (e) => {
    e.preventDefault();

    props.history.push(`/search?name=${name}`);
  };

  return (
    <div>
      <form className="search" onSubmit={submitHandler}>
        <div className="row">
          <input
            type="text"
            name="keyWords"
            id="keyWords"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBox;

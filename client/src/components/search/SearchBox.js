import React, { useState } from "react";

// import "./SearchBox.css";

function SearchBox(props) {
  // the default keyword is "all"
  const [name, setName] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();

    // props.history.push(`/home?name=${name}`);
  };

  return (
    <div className="row my-4 my-sm-5 m-auto">
      {/* It is more reasonable to move the search box from navbar to home page */}
      <div className="col-md-2"></div>
      <div className="col-md-8 col-sm-10">
        <form
          className="d-flex justify-content-center"
          onSubmit={props.handleSearch}
        >
          <input
            className="form-control col-sm-8 col-md-9 me-1 me-sm-2"
            type="search"
            value={props.name === "all" ? "" : props.name}
            placeholder="Search"
            style={{ cursor: "text" }}
            onChange={(e) => props.setName(e.target.value)}
          />
          <button
            className="btn btn-outline-success col-sm-4 col-md-3 ms-1 ms-sm-2"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="col-md-2"></div>
    </div>
  );
}

export default SearchBox;

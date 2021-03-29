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
    <div className="row my-5 m-auto" style={{ width: "50%" }}>
      {/* It is more reasonable to move the search box from navbar to home page */}
      <form
        className="d-flex justify-content-center"
        onSubmit={props.handleSearch}
      >
        <input
          className="form-control me-2 col-9"
          type="search"
          value={props.name === "all" ? "" : props.name}
          placeholder="Search"
          style={{ cursor: "text" }}
          onChange={(e) => props.setName(e.target.value)}
        />
        <button className="btn btn-outline-success col-3 ms-2" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBox;

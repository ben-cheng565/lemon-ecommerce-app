import React from "react";
import { Link } from "react-router-dom";

function Pagination(props) {
  return (
    <div className="row mt-3 justify-content-end">
      <div className="col-auto">
        <ul className="pagination">
          {/* check if current page is the first one */}
          <li
            className={props.page === 1 ? "page-item disabled" : "page-item"}
            key="0"
          >
            <Link className="page-link" to={`${props.baseUrl}?currPage=1`}>
              <span>&laquo;</span>
            </Link>
          </li>
          {[...Array(props.pages).keys()].map((p) => (
            <li
              className={
                p + 1 === props.page ? "page-item active" : "page-item"
              }
              key={`${p + 1}`}
            >
              <Link
                className="page-link"
                to={`${props.baseUrl}?currPage=${p + 1}`}
              >
                {p + 1}
              </Link>
            </li>
          ))}

          {/* chech if current page is the last one */}
          <li
            className={
              props.page === props.pages ? "page-item disabled" : "page-item"
            }
            key={`${props.pages + 1}`}
          >
            <Link
              className="page-link"
              to={`${props.baseUrl}?currPage=${props.pages}`}
            >
              <span>&raquo;</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;

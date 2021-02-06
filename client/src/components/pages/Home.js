import React from "react";
import Product from "../Product";
import { data } from "../../data";

function Home() {
  return (
    <div className="row center">
      {data.products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}

export default Home;

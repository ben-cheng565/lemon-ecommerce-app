import { BrowserRouter, Link, Route } from "react-router-dom";
import Cart from "./components/pages/Cart";
import Home from "./components/pages/Home";
import ProductDetail from "./components/pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Dandelion
            </Link>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" component={ProductDetail} />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

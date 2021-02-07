import { BrowserRouter, Link, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Home from "./pages/Home";
import ProductDetail from "./components/product/detail/ProductDetail";
import CartBadge from "./components/cart/badge/CartBadge";

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
            <Link to="/cart">
              Cart
              <CartBadge />
            </Link>
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

import { BrowserRouter, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Home from "./pages/Home";
import ProductDetail from "./components/product/detail/ProductDetail";
import Signin from "./components/user/signin/Signin";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <NavBar />
        </header>
        <main>
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/signin" component={Signin} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/" exact component={Home} />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

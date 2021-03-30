import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Home from "./pages/Home";
import ProductDetail from "./components/product/detail/ProductDetail";
import Signin from "./components/user/signin/Signin";
import Signup from "./components/user/signup/Signup";
import NavBar from "./components/navBar/NavBar";
import ShippingAddress from "./pages/shipping/ShippingAddress";
import PaymentMethod from "./pages/payment/PaymentMethod";
import PlaceOrder from "./pages/order/PlaceOrder";
import OrderDetails from "./pages/order/OrderDetails";
import OrderHistory from "./pages/order/OrderHistory";
import Profile from "./pages/Profile";
import ProductList from "./pages/product/ProductList";
import ProductEdit from "./pages/product/ProductEdit";
import OrderList from "./pages/order/OrderList";
import UserList from "./pages/user/UserList";
import UserEdit from "./pages/user/UserEdit";
import MapTool from "./pages/shipping/MapTool";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <NavBar />
        </header>
        <main className="pb-5">
          <Switch>
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
            <Route path="/product/:id" exact component={ProductDetail} />
            <Route path="/product/edit/:id" component={ProductEdit} />
            <Route path="/shipping" component={ShippingAddress} />
            <Route path="/payment" component={PaymentMethod} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/order/:id" component={OrderDetails} />
            <Route path="/orderhistory" component={OrderHistory} />
            <Route path="/orderlist" component={OrderList} />
            <Route path="/userlist" component={UserList} />
            <Route path="/user/edit/:id" component={UserEdit} />
            <Route path="/productlist" component={ProductList} />
            <Route path="/map" component={MapTool} />
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
        <div className="row" style={{ height: "60px" }}></div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Register from "./register/Register";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import Header from "./header/Header";
import Profile from "./profile/Profile";
import Category from "./Category/Category";
import Product from "./Category/Product/Product";
import Cart from './Cart/Cart';
import Admin from "./Admin/Admin";
import NoMatch from "./NoMatch";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className=" App">
          <Header />
          <main>
            <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/category/:id" exact component={Category}/>
          <Route path="/category/:categoryId/product/:id" component={Product}/>
          <Route path="/cart" component={Cart}/>
          
          <Route path="/admin" component={Admin} />
          <Route component={NoMatch} />
          </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

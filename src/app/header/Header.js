import React from "react";
import { Link } from "react-router-dom";
import CartBtn from "./CartBtn/CartBtn";
import cookie from "react-cookies";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
// search react how render component conditionly
//add logout to user services
  logout(){
    cookie.remove('user');
  }

  render() {
    return (
      <header className="sticky-top">
        <div className="header-container">
          {/* <img className="header-logo" src="http://localhost:3000/images/mystore_logo.jpg" alt=""></img> */}
          <ul className="menu">
            <li className="link  ">
              <Link to="/">Homepage</Link>
            </li>

            <li className="link">
              <Link to="/profile">Profile</Link>
            </li>

            <li className="link">
              <Link to="/register">Register</Link>
            </li>

            <li className="link">
              <Link to="/login">Login</Link>
            </li>
            <li className="link">
              <Link to="/cart">
                <CartBtn />
              </Link>
            </li>
          </ul>
          <button onClick={this.logout.bind(this)}>LogOut</button>
        </div>
      </header>
    );
  }
}
export default Header;

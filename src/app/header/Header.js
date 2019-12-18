import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import CartBtn from "./CartBtn/CartBtn";
import cookie from "react-cookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { LogOut } from "../redux/actions";

// import storeLogo from './images/store-logo-png-3.png';

class Header extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  // search react how render component conditionly
  //add logout to user services
  logout() {
    cookie.remove("user");
    this.props.LogOut();
  }

  render() {
    return (
      <header className=" sticky-top">
        <div className="header-container">
          <Link to="/" className="header-link">
            <img
              className="header-logo"
              src="/images/dotSTORE-logo.png"
              alt=""
            ></img>
          </Link>

          <ul className="menu">
            <li className="header-link-container"></li>
            {this.props.loggedIn ? (
              <li className="header-link-container">
                <Link to="/profile" className="header-link">
                  <FontAwesomeIcon icon={faUser} className="header-icon" />
                  Profile
                </Link>
              </li>
            ) : (
              <li className="header-link-container">
                <Link to="/register" className="header-link">
                  Register
                </Link>
              </li>
            )}
            {this.props.loggedIn ? (
              <li className="header-link-container">
                <Link
                  to="/"
                  onClick={this.logout.bind(this)}
                  className="header-link"
                >
                  LogOut
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="header-icon"
                  />
                </Link>
              </li>
            ) : (
              <li className="header-link-container">
                <Link to="/login" className="header-link">
                  Login
                </Link>
              </li>
            )}
            <li className="header-link-container">
              <Link to="/cart" className="header-link">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="header-icon"
                />
                <CartBtn />
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};
export default connect(
  mapStateToProps,
  { LogOut }
)(Header);

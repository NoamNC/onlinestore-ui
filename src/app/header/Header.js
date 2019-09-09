import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './header.scss';
import UserService from "../../services/user.service";
import CartBtn from "./CartBtn/CartBtn";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loggedIn: false

    };
  }

  componentDidMount() {
    UserService.me()
      .then(response => response.json())
      .then(()=> {
        this.setState({loggedIn: true});
      });
}

  render() {
    return (
      <header>
      <div >
        <ul className="nav">
          <div className="img">
          </div>
          <li className="link">
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
                <Link to="/cart">Cart<CartBtn></CartBtn></Link>
              </li>
        </ul>
        </div>
      </header>
    )
  }

}
export default Header;

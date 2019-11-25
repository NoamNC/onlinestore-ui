import React from "react";
import UserService from "../../services/user.service";
import "./profile.scss";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }
  componentDidMount() {
    UserService.me()
      .then(response => response.json())
      .then(user => {
        this.setState({ user });
      });
  }

  send(user) {
    UserService.edit(this.state.user._id, user)
      .then(res => res.json())
      .then(user => {
        this.setState({ user });
        this.props.history.push("/profile");
      });
  }

  render() {
    return (
      <div className="main-profile">
        <div className="container">
          <div className="profile-content">
            <div className="edit-profile"></div>
            <h2>{`${this.state.user.firstName} ${this.state.user.lastName}`}</h2>

            <div className="img-container">
              <img
                src={require("./images/generic-profile-picture.png")}
                className="profile-pic"
                alt=""
              />
              <img
                src={"http://localhost:4000/user/" + this.state.user.image}
                className="profile-pic"
                alt=""
              />
            </div>
            <div className="profile-body">
              <h3>info:</h3>
              <div className="info-field">
                <span className="first-name">
                  First name: {this.state.user.firstName}
                </span>
              </div>
              <div className="info-field">
                <span className="last-name">
                  Last name: {this.state.user.lastName}
                </span>
              </div>
              <div className="info-field">
                <span className="email-address">
                  Email address: {this.state.user.email}
                </span>
              </div>
              <div className="info-field">
                <span className="phone-number">
                  Phone number: {this.state.user.phone}
                </span>
              </div>
            </div>
            <Link to="/profile/edit">Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

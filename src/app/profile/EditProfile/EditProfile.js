import React from "react";
import { Formik, Form, Field } from "formik";
import User from "../../../models/user";
import UserService from "../../../services/user.service";
import "../profile.scss";

// const genericProfilePic = require("../images/generic-profile-picture.png");

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      submitting: false,
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
    this.setState({ submitting: true });
    UserService.editMe(this.state.user._id, user)
      .then(res => res.json())
      .then(user => {
        this.setState({ user });
        this.setState({ submitting: false });
        this.props.history.push("/profile");
      });
  }

  render() {
    return (
      <div className="main-profile">
        <div className="container">
          <div className="profile-content">
            <h2>{`${this.state.user.firstName} ${this.state.user.lastName}`}</h2>
            <div className="img-container">
              {/* <img
                src={require("../images/generic-profile-picture.png")}
                className="profile-pic"
                alt=""
              /> */}
            </div>
            <div className="profile-body">
              <h3>Edit info:</h3>
              <Formik
                initialValues={{
                  firstName: this.state.user.firstName,
                  lastName: this.state.user.lastName,
                  email: this.state.user.email,
                  password: this.state.user.password,
                  phone: this.state.user.phone,
                  isAdmin: this.state.user.isAdmin
                }}
                validationSchema={User}
                onSubmit={this.send.bind(this)}
                enableReinitialize
              >
                <Form>
                  <div className="info-field">
                    <span> First name: </span>
                    <Field
                      type="text"
                      name="firstName"
                      className="first-name"
                      placeholder={this.state.user.firstName}
                    />
                  </div>
                  <div className="info-field">
                    <span> Last name: </span>
                    <Field
                      type="text"
                      name="lastName"
                      className="last-name"
                      placeholder={this.state.user.lastName}
                    />
                  </div>
                  <div className="info-field">
                    <span> Email: </span>
                    <Field
                      type="email"
                      name="email"
                      className="email-address"
                      placeholder={this.state.user.email}
                    />
                  </div>
                  <div className="info-field">
                    <span> Phone number: </span>
                    <Field
                      type="text"
                      name="phone"
                      className="phone-number"
                      placeholder={this.state.user.phone}
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;

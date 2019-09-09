import React from "react";
import { Formik, Form, Field } from "formik";
import User from "../../models/user";
import UserService from "../../services/user.service";
import "./profile.scss";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      editMode: false
    };
  }
  componentDidMount() {
    UserService.me()
      .then(response => response.json())
      .then(user => {
        this.setState({ user });
      });
  }

  changeState(){
    this.setState({editMode: !this.state.editMode});
  }

  send(user) {
    UserService.edit(this.state.user._id,user)
    .then((res) => res.json())
    .then(user => {
      this.setState({user});
      this.props.history.push("/profile");
    });
  }

  render() {
    if(!this.state.editMode){
    return (
      <div className="main-profile">
        <div className="container">
          <div className="profile-content">
            <div className="edit-profile"><a href="#" onClick={this.changeState.bind(this)} >Edit</a></div>
          <h2>{`${this.state.user.firstName} ${ this.state.user.lastName}`}</h2>
        
        <div className="img-container">
        <img
          src={require("./images/generic-profile-picture.png")}
          className="profile-pic"
        />
        </div>
        <div className="profile-body">
          <h3>info:</h3>
                    <div className="info-field">
                    <span className="first-name">First name: {this.state.user.firstName}</span>
                  </div>
                  <div className="info-field">
                    <span className="last-name">Last name: {this.state.user.lastName}</span>
                  </div>
                  <div className="info-field">
                    <span className="email-address">Email address: {this.state.user.email}</span>
                  </div>
                  <div className="info-field">
                    <span className="phone-number">Phone number: {this.state.user.phone}</span>
            </div>

 
        </div>
        </div>
        </div>
      </div>
    );
    }
    else{
      return (
        <div className="main-profile">
          <div className="container">
            <div className="profile-content">
              <div className="edit-profile"><a href="#" onClick={this.changeState.bind(this)} >Edit</a></div>
            <h2>{`${this.state.user.firstName} ${ this.state.user.lastName}`}</h2>
          
          <div className="img-container">
          <img
            src={require("./images/generic-profile-picture.png")}
            className="profile-pic"
          />
          </div>
          <div className="profile-body">
            <h3>Edit info:</h3>
            <Formik
          initialValues={{
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            email: this.state.user.email,
            password: this.state.user.password,
            phone: this.state.user.phone
          }}
          validationSchema={User}
          onSubmit={this.send.bind(this)}
        >
          <Form>
                      <div className="info-field">
                      <span> First name: </span><Field type="text" name="firstName" className="first-name" placeholder={this.state.user.firstName}/>
                    </div>
                    <div className="info-field">
                    <span> Last name: </span><Field type="text" name="lastName" className="last-name" placeholder={this.state.user.lastName}/>
                    </div>
                    <div className="info-field">
                    <span> Email: </span><Field type="email" name="email" className="email-address" placeholder={this.state.user.email}/>
                    </div>
                    <div className="info-field">
                    <span> Phone number: </span><Field type="text" name="phone" className="phone-number" placeholder={this.state.user.phone}/>
              </div>
              <div >
              <input type="submit" value="submit" className="btn btn-primary" />
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
}

export default Profile;

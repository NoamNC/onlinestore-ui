import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Link } from "react-router-dom";
import User from "../../models/user";
import UserService from '../../services/user.service';
import "./register.scss";


class Register extends React.Component {

  constructor(props){
    super(props);
    this.state={
      submiting: false
    }
  }
  send(values) {
    this.setState({submiting: true});
    UserService.register(values)
    .then(()=>{
      this.setState({submiting: false});
      this.props.history.push("/");
    })
    .then(()=>UserService.login(values.email, values.password));
  }

  render() {
    return (
      <div className="main">
        <section className="signup">
      <div className="container">
      <div className="signup-content">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: ""
          }}
          validationSchema={User}
          onSubmit={this.send.bind(this)}
        >
          <Form>
          <h2 className="form-title">Create account</h2>
            <div className="form-grop">
              <label>Name:</label>
              <Field type="text" name="firstName" className="form-input" placeholder="First name"/>
              <ErrorMessage
                name="firstName"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-grop">
              <Field type="text" name="lastName" className="form-input"  placeholder="Last name"/>
              <ErrorMessage
                name="lastName"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-grop">
              <label>Email:</label>
              <Field type="email" name="email" className="form-input"  placeholder="example_Email@gmail.com"/>
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-grop">
              <label>Password:</label>
              <Field type="password" name="password" className="form-input"  placeholder="Your password"/>
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
               <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
            </div>
            <div className="form-grop">
              <label>Phone Number:</label>
              <Field type="text" name="phone" className="form-input"  placeholder="type here your phone number"/>
              <ErrorMessage
                name="phone"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
                            <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                            <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                        </div>
            <div className="form-grop">
              <input type="submit" value="submit" className="btn btn-primary" disabled={this.state.submiting} />
            </div>
          </Form>
        </Formik>
        <p className="loginhere">
                        Already have an account ? <Link to="/login" className="loginhere-link">Login here</Link>
                    </p>
        </div>
      </div>
      </section>
      </div>
    );
  }
}
export default Register;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import User from "./models/user";
import UserService from './services/user.service';
// import "./register.scss";


class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  send(values) {
    UserService.register(values)
    .then(() => {
      this.props.history.push("/login");
    });
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
              <label>First name:</label>
              <Field type="text" name="firstName" className="form-input" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-grop">
              <label>Last name:</label>
              <Field type="text" name="lastName" className="form-input" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-grop">
              <label>Email:</label>
              <Field type="email" name="email" className="form-input" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-grop">
              <label>Password:</label>
              <Field type="password" name="password" className="form-input" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
               <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
            </div>
            <div className="form-grop">
              <label>Phone:</label>
              <Field type="text" name="phone" className="form-input" />
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
              <input type="submit" value="submit" className="btn btn-primary" />
            </div>
          </Form>
        </Formik>
        <p className="loginhere">
                        Have already an account ? <a href="#" className="loginhere-link">Login here</a>
                    </p>
        </div>
      </div>
      </section>
      </div>
    );
  }
}
export default Register;

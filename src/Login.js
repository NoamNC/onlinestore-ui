import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./App.scss";
import User from "./models/user";
import userService from "./services/user.service";

class Login extends React.Component {
  send(values) {
    userService
      .login(values.email, values.password)
      .then(response => response.json())
      .then(response =>{ 
        document.cookie = "user=" + response.token
        this.props.history.push('/');
    });
  }

  render() {
    return (
      <div className="container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={this.send.bind(this)}
        >
          <Form>
            <div className="form-grop">
              <label>Email:</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-grop">
              <label>Password:</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-grop">
              <input type="submit" value="submit" className="btn btn-primary" />
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default Login;

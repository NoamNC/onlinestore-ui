import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import User from "./models/user";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  send(values) {
    fetch("http://localhost:4000/api/user", {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      this.props.history.push("/login");
    });
  }

  render() {
    return (
      <div className="container">
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
            <div className="form-grop">
              <label>First name:</label>
              <Field type="text" name="firstName" className="form-control" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-grop">
              <label>Last name:</label>
              <Field type="text" name="lastName" className="form-control" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="alert alert-danger"
              />
            </div>
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
              <label>Phone:</label>
              <Field type="text" name="phone" className="form-control" />
              <ErrorMessage
                name="phone"
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
export default Register;

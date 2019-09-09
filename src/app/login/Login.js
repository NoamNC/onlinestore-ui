import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../App.scss";
import userService from "../../services/user.service";
import './login.scss';
import cookie from 'react-cookies'



class Login extends React.Component {

  constructor(props){
    super(props);
    this.state={
      submiting: false
    }
  }

  send(values) {
    userService
      .login(values.email, values.password)
      .then(response => response.json())
      .then(response =>{ 
        const twoWeeksTime=60*60*24*14;
        cookie.save('user',response.token, {path:'/', maxAge: twoWeeksTime });
        this.setState({submiting: false});
        this.props.history.push('/profile');
    })
    .catch(err=>console.log(err));
  }

  render() {
    return (
      <div className="main">
        <section className="login">
      <div className="container">
        <div className="login-content">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={this.send.bind(this)}
        >
          <Form>
          <h2 className="form-title">Login</h2>

            <div className="form-grop ">
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
            </div>

					<div className="container-login-form-btn">
              <input type="submit" value={this.state.submiting?'logging...' : 'login'} className="btn btn-primary" disabled={this.state.submiting}/>
					</div>
          <div>
						<a href="#" className="loginhere-link">
							Forgot password?
						</a>
					</div>
          <p className="loginhere">
                        Not a member? <Link to="/register" className="loginhere-link">Signup here</Link>
                    </p>

          </Form>
        </Formik>
        </div>
      </div>
      </section>
      </div>
    );
  }
}

export default Login;

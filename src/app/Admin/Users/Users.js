import React, { Component } from "react";
// import { Link } from "react-router-dom";
import userService from "../../../services/user.service";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentAdmin:{}
    };
  }

  componentDidMount() {
    userService.getAll()
      .then(res => res.json())
      .then(users => this.setState({ users }));

    userService
      .me()
			.then(response => response.json())
			.then(user => {
				this.setState({currentAdmin: user})
			});
  }

  makeAdmin(userId, user) {
    if(this.state.currentAdmin.id===user.id){
      alert("error: admin cannot change own status");
    } else {
      let confirm = window.confirm(
        "are you sure you want to change admin status?"
      );
      if (confirm === true) {
        user.isAdmin = !user.isAdmin;
        user.changImage = false;
        userService.edit(userId, user);
        userService
          .getAll()
          .then(res => res.json())
          .then(users => this.setState({ users }));
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Admin</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => {
              return (
                <tr key={user.id}>
                  {/* <td>{user.id.substring(user.id.length - 6)}</td> */}
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.isAdmin ? "yes" : "no"}</td>
                  <td>
                    <button
                      type="button"
                      onClick={this.makeAdmin.bind(this, user.id, user)}
                    >
                      {user.isAdmin ? "Remove admin" : "Create admin"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;

import React from "react";
import UserService from './services/user.service';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
          profile: []
        }
    }
  componentDidMount() {
      UserService.me()
      .then(response=>response.json())
    .then(user=>{
        this.setState({user});
    });
  }

  render() {
    return (
      <div className="container">
          <h1>User</h1>
          <span>{this.state.profile.name}</span>
      </div>
    );
  }
}

export default Profile;

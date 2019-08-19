import React from "react";

class Profile extends React.Component {
    constructor(props){
        super(props);
    }
  componentDidMount() {
      const token = document.cookie.split('user=')[1];
    fetch("http://localhost:4000/api/user/me", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      }
    }).then(response=>response.json())
    .then(user=>{
        console.log(user);
    });
  }

  render() {
    return (
      <div className="container">
          <h1>User</h1>
      </div>
    );
  }
}

export default Profile;

import React from "react";
import Categories from "./categories/categories"
import "./Homepage.scss"


class Homepage extends React.Component {

  render() {
    return (
        <div className="container">
          <section className="homepage">
        <div className="container">
          <div className="homepage-content">
          <h2>Homepage</h2>
          <Categories></Categories>
          </div>
        </div>
        </section>
        </div>
      );
  }
}
export default Homepage;

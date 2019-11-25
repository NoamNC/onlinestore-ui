import React from "react";
import Categories from "./categories/categories";
import "./Homepage.scss";

class Homepage extends React.Component {
  render() {
    return (
        <section className="homepage-container">
          <div className="homepage-content ">
            <h2 >Homepage</h2>
            <div className="banner-container">banner</div>
            <Categories className=""></Categories>
          </div>
        </section>
    );
  }
}
export default Homepage;

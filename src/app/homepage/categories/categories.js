import React, { Component } from "react";
import CategoryService from "../../../services/category.service";
import { Link } from "react-router-dom";
import "./categories.scss";

export class categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  componentDidMount() {
    CategoryService.getAll()
      .then(res => res.json())
      .then(categories => {
        this.setState({ categories });
      });
  }

  render() {
    return (
      <div className="categories-container">
        {this.state.categories.map((category, i) => {
          return (
            <Link
              to={"/category/" + category.id}
              className="category-container"
              key={i}
            >
              <div className="categoris-image-container">
                <img
                  src={"http://localhost:4000/categories/" + category.image}
                  alt=""
                  className="category-image"
                />
              </div>
              <h6 className="category-title">{category.title}</h6>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default categories;

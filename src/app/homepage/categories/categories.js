

import React, { Component } from 'react'
import CategoryService from "../../../services/category.service";
import {Link} from "react-router-dom";
import "./categories.scss";

export class categories extends Component {

    constructor(props){
        super(props);
        this.state={
            categories: []
        }
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
            <div className="category-container">
            {this.state.categories.map((category,i) => {
              return  <Link to={'/category/' + category.id}
              className="category"
              key={i}>{category.title}
              </Link>
            //   <div className="category">
            //   <h2 className="category-title">{category.title}</h2>
            //   </div>;
            })}
            </div>
            
        )
    }
}

export default categories

import React, { Component } from "react";
import CategoryService from "../../../services/category.service";
import { Link } from "react-router-dom";
import "./Categories.scss";

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.categoryId = this.props.match.params.id;
    this.state = {
      editMode: false,
      categories: []
    };
  }

  componentDidMount() {
    CategoryService.getAll()
      .then(res => res.json())
      .then(categories => this.setState({ categories }));
  }

  
  delete(categoryId){
    let confirm = window.confirm("are you sure you want to delete?");
    if(confirm===true){
    CategoryService.remove(categoryId);
    CategoryService.getAll()
    .then(res => res.json())
    .then(categories=>this.setState({categories}));
    }
}

  changeState() {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
      return (
        <div>
          <h2>Categories</h2>
          <div className="d-flex justify-content-end mb-3">
            <Link to="/admin/categories/create" className="btn btn-primary">
              Create Category
            </Link>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Picture</th>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {this.state.categories.map(category => {
                return (
                  <tr key={category.id}>
                    <td>
                      <img
                        src={
                          "http://localhost:4000/categories/" + category.image
                        }
                        alt=""
                        className="admin-image"
                      />
                    </td>
                    {/* <td>{category.id.substring(category.id.length - 6)}</td> */}
                    <td><Link to={`/admin/categories/${category.id}/products`}>{category.title}</Link></td>
                    <td><Link to={`/admin/categories/edit/${category.id}`}>Edit</Link>
                    <button type="button" onClick={this.delete.bind(this, category.id)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    
  }
}

export default Categories;

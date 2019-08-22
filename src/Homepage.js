import React from "react";
import CategoryService from "./services/category.service";


class Homepage extends React.Component {
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
      <div className="container">
        <h2>Homepage</h2>
        {this.state.categories.map(category => {
          return <div>{category.title}</div>;
        })}
      </div>
    );
  }
}
export default Homepage;

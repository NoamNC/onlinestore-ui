import React from "react";
import { Field, Form, Formik } from "formik";
import Product from "../../../../models/product";
import ProductService from "../../../../services/product.sevice";
import CategoryService from "../../../../services/category.service";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      categories: [],
      submitting: false,
      changeImage: false
    };
  }

  componentDidMount() {
    ProductService.getById(this.props.match.params.id)
      .then(res => res.json())
      .then(product => {
        this.setState({ product });
      });

    CategoryService.getAll()
      .then(res => res.json())
      .then(categories => {
        this.setState({ categories });
      });
  }

  changeImageState() {
    this.setState({ changeImage: !this.state.changeImage });
  }

  send(values) {
 
    this.setState({ submitting: true });
    values.changeImage = this.state.changeImage;
    ProductService.edit(this.props.match.params.id, values).then(() => {
      this.setState({ submitting: false });
      this.props.history.push("/admin/products");
    });
  }

  render() {
    return (
      <div>
        <h1>Edit Product</h1>
        <Formik
          initialValues={{
            title: this.state.product.title,
            categoryId: this.state.product.categoryId,
            price: this.state.product.price,
            image: this.state.product.image,
            added: this.state.product.added
          }}
          validationSchema={Product}
          onSubmit={this.send.bind(this)}
          enableReinitialize
          render={({ setFieldValue }) => {
            return (
              <Form className="col-sm-6">
                <div className="form-group">
                  <label>Title:</label>
                  <Field name="title" type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <Field
                    name="categoryId"
                    component="select"
                    className="form-control"
                  >
                    <option selected disabled value="">
                      Choose category
                    </option>
                    {this.state.categories.map((category, index) => {
                      return (
                        <option key={index} value={category.id}>
                          {category.title}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <Field name="price" type="number" className="form-control" />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    onClick={this.changeImageState.bind(this)}
                  >
                    {this.state.changeImage ? "cancel" : "Change image"}
                  </button>
                  {this.state.changeImage ? (
                    <div className="form-group">
                      <label>Image:</label>
                      <input
                        name="image"
                        type="file"
                        onChange={event => {
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="form-group">
                      <label>Image:</label>
                      <img
                        src={
                          "http://localhost:4000/products/" +
                          this.state.product.image
                        }
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                    disabled={this.state.submitting}
                  />
                </div>
              </Form>
            );
          }}
        ></Formik>
      </div>
    );
  }
}

export default Edit;

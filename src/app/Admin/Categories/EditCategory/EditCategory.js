import React from "react";
import { Field, Form, Formik } from "formik";
import Category from "../../../../models/category";
import CategoryService from "../../../../services/category.service";


class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      submitting: false,
      changeImage: false
    };
  }

  componentDidMount() {
    CategoryService.getById(this.props.match.params.id)
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
    values.changeImage=this.state.changeImage;
    CategoryService.edit(this.props.match.params.id, values)
    .then(() => {
      this.setState({ submitting: false });
      this.props.history.push("/admin/categories");
    });
  }

  render() {
    return (
      <div>
        <h1>Edit Category</h1>
        <Formik
          initialValues={{
            title: this.state.categories.title,
            image: this.state.categories.image
          }}
          validationSchema={Category}
          onSubmit={this.send.bind(this)}
          enableReinitialize
          render={({ setFieldValue }) => {
            return (
              <Form className="col-sm-6">
                <div className="form-group">
                  <label>Title:</label>
                  <Field name="title" type="text" className="form-control" />
                </div>
                <button
                  type="button"
                  onClick={this.changeImageState.bind(this)}
                >
                  {this.state.changeImage ? 'cancel' : 'Change image'}
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
                        "http://localhost:4000/categories/" +
                        this.state.categories.image
                      }
                      alt=""
                    />
                  </div>
                )}

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

export default EditCategory;

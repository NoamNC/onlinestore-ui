import React from "react";
import { Field, Form, Formik } from "formik";
import Category from "../../../../models/category";
import CategoryService from "../../../../services/category.service";

class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false
    };
  }

  send(values) {
    this.setState({ submitting: true });
    CategoryService.create(values).then(() => {
      this.setState({ submitting: false });
      this.props.history.push("/admin/categories");
    });
  }

  render() {
    return (
      <div>
        <h1>Create Category</h1>
        <Formik
          initialValues={{ title: "", image: "" }}
          validationSchema={Category}
          onSubmit={this.send.bind(this)}
          render={({ setFieldValue }) => {
            return (
              <Form className="col-sm-6">
                <div className="form-group">
                  <label>Title:</label>
                  <Field name="title" type="text" className="form-control" />
                </div>
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

export default CreateCategory;

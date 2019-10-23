import React from 'react';
import { Field, Form, Formik} from "formik";
import Product from "../../../../models/product";
import CategoryService from '../../../../services/category.service';
import ProductService from '../../../../services/product.sevice';

class CreateProduct extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            categories: [],
			submitting: false
		};
	}


        componentDidMount(){
            CategoryService
                .getAll()
                .then(res => res.json())
                .then(categories => {
					this.setState({categories});
                });
            }
        


			send(values) {
				this.setState({submitting: true});
				ProductService.create(values)
					.then(() => {
					this.setState({submitting: false})
					this.props.history.push('/admin/products');
					});

			}
    
	render() {
		return (
			<div>
				<h1>Products</h1>
				<Formik
					initialValues={{title: '', categoryId: '', price: '', image: ''}}
					validationSchema={Product}
					onSubmit={this.send.bind(this)}
					render={({setFieldValue})=>{
						return <Form className="col-sm-6">
						<div className="form-group">
							<label>Title:</label>
							<Field name="title" type="text" className="form-control" />
						</div>
						<div className="form-group">
							<label>Category:</label>
							<Field name="categoryId" component="select" className="form-control">
                            <option selected disabled value="">Choose category</option>
								{this.state.categories.map((category, index) => {
									return <option key={index} value={category.id}>
										{category.title}
									</option>
								})}
							</Field>
						</div>
						<div className="form-group">
							<label>Price:</label>
							<Field name="price" type="number" className="form-control" />
						</div>
						<div className="form-group">
							<label>Image:</label>
							<input name="image" type="file" onChange={(event)=>{
								setFieldValue('image', event.currentTarget.files[0]);
							}} />
						</div>
						<div className="form-group">
							<input type="submit"
							       value="Submit"
							       className="btn btn-primary"
							       disabled={this.state.submitting} />
						</div>
					</Form>
					}}>
				</Formik>
			</div>
		);
	}
}

export default CreateProduct; 
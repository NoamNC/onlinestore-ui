import * as yup from 'yup';

export default yup.object().shape({
	title: yup.string().required(),
	price: yup.number().required(),
	image: yup.mixed().required(),
	categoryId: yup.string().required()
});
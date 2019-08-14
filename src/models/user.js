import * as yup from "yup";

export default yup.object().shape({
  firstName: yup.string().required().min(2).max(20),
  lastName: yup.string().required().min(2).max(20),
  email: yup.string().email(),
  password: yup.string().required().min(9).max(20),
  phone: yup.string().required().min(9).max(13)
});

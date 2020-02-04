import * as Yup from 'yup';

export default {
  storeSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
  }),
  updateSchema: Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
  }),
};

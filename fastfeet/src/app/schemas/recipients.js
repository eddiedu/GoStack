import * as Yup from 'yup';

export default {
  storeSchema: Yup.object().shape({
    name: Yup.string().required(),
    street: Yup.string().required(),
    additionalAddress: Yup.string(),
    city: Yup.string().required(),
    zipCode: Yup.string()
      .required()
      .matches('[0-9]{5}-[0-9]{3}', 'ZIP CODE invalid. It should be 00000-000'), // https://regexr.com/
    number: Yup.number()
      .required()
      .positive()
      .integer(),
  }),
  updateSchema: Yup.object().shape({
    name: Yup.string().required(),
    street: Yup.string().required(),
    additionalAddress: Yup.string(),
    city: Yup.string().required(),
    zipCode: Yup.string()
      .required()
      .matches('[0-9]{5}-[0-9]{3}', 'ZIP CODE invalid. It should be 00000-000'), // https://regexr.com/
    number: Yup.number()
      .required()
      .positive()
      .integer(),
  }),
};

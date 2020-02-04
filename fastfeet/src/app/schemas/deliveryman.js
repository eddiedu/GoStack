import * as Yup from 'yup';

export default {
  storeSchema: Yup.object().shape({
    description: Yup.string().required(),
  }),
};

import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

import Input from '~/components/forms/input';

export default function SignUp() {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Inisira um email valido')
          .required('O e-mail é obrigatório'),
        password: Yup.string()
          .min(6, 'No mínimo 6 carateres')
          .required('A senha é  obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      console.tron.log(data);
      const { name, email, password } = data;
      dispatch(signUpRequest(name, email, password));
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua seha secreta" />

        <button type="submit"> Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}

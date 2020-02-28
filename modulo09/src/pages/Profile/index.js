import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import AvatarInput from './AvatarInput';
import Input from '~/components/forms/input';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const profile = useSelector(state => state.user.profile);
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email('Inisira um email valido')
          .required('O e-mail é obrigatório'),
        // oldPassword: Yup.string().required('A senha é  obrigatória'),
        // password: Yup.string().required('A senha é  obrigatória'),
        // confirmPassword: Yup.string().required('A senha é  obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation  passed
      console.tron.log(data);

      dispatch(updateProfileRequest(data));
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

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={profile}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de sua senha"
        />

        <button type="submit">
          {loading ? 'Atualizando...' : 'Atualizar perfil'}
        </button>
      </Form>
      <button type="submit" onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}

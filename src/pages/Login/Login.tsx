import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormLoginType } from '../../type';
import { loginEmailAction } from '../../redux/actions';
import styles from '../pages.module.css';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const INITIAL_STATE: FormLoginType = {
    email: '',
    password: '',
  };

  const [form, setForm] = useState(INITIAL_STATE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginEmailAction(form.email));
    navigate('/carteira');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  console.log(form);
  const { email, password } = form;
  return (
    <main className={ styles.container }>
      <h1>Wallet</h1>
      <form
        className={ styles.form }
        onSubmit={ (e) => handleSubmit(e) }
      >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={ email }
          data-testid="email-input"
          onChange={ (e) => handleChange(e) }
        />
        <label htmlFor="password"> Senha:</label>
        <input
          type="password"
          id="password"
          value={ password }
          data-testid="password-input"
          onChange={ (e) => handleChange(e) }
        />
        { password.length > 7 && <p>A senha precisa ter ao menos 8 caracteres.</p> }
        <button
          className={
            password.length > 7 ? styles.btnSubmitEnabled : styles.btnSubmitDisabled
          }
          disabled={
            !email.match(/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/)
            || password.length < 6
          }
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;

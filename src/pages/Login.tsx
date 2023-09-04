import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userForm } from '../redux/actions';

function Login() {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const INITIAL_STATE_LOGIN = {
    email: '',
    password: '',
  };
  const [form, setForm] = useState(INITIAL_STATE_LOGIN);
  const [email, setEmail] = useState(false);

  const handleForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(userForm(form));
    navigate('/carteira');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === 'email') {
      const result = emailRegex.test(value);
      setEmail(result);
    }
    setForm({
      ...form,
      [id]: value,
    });
  };
  console.log(form);

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          data-testid="email-input"
          id="email"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name=""
          id="password"
          data-testid="password-input"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <button
        disabled={
          !email || form.password.length < 6
        }
        onClick={ (e) => handleForm(e) }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;

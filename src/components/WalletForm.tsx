import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './walletForm.module.css';
import { Dispatch, GlobalState } from '../type';
import { editExpenseAction,
  expensesAction, searchCurrenciesAction } from '../redux/actions';

function WalletForm() {
  const INIITIAL_STATE = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  const dispatch: Dispatch = useDispatch();
  const { currencies, isEditing } = useSelector((state: GlobalState) => state.wallet);
  const [form, setForm] = useState(INIITIAL_STATE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editExpenseAction(form));
      setForm({
        ...INIITIAL_STATE,
        id: form.id,
      });
    } else {
      dispatch(expensesAction(form));
      setForm({
        ...INIITIAL_STATE,
        id: form.id + 1,
      });
    }
  };
  const handleChange = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  useEffect(() => {
    async function searchCurrencies() {
      dispatch(searchCurrenciesAction());
    }
    searchCurrencies();
  }, []);
  const { value, description, tag, currency, method } = form;
  console.log(isEditing);

  return (
    <main className={ style.container }>
      <form
        className={ style.form }
        onSubmit={ (e) => handleSubmit(e) }
      >
        <label htmlFor="value">Valor:</label>
        <input
          type="number"
          id="value"
          value={ value }
          data-testid="value-input"
          onChange={ (e) => handleChange(e) }
        />
        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          id="description"
          value={ description }
          data-testid="description-input"
          onChange={ (e) => handleChange(e) }
        />
        <label htmlFor="currency">Moeda:</label>
        <select
          className={ style.select }
          id="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ (e) => handleChange(e) }
        >
          { currencies.map((curr) => (
            <option key={ curr } value={ curr }>{curr}</option>
          ))}
        </select>
        <label htmlFor="method">Método de pagamento:</label>
        <select
          id="method"
          className={ style.select }
          value={ method }
          data-testid="method-input"
          onChange={ (e) => handleChange(e) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <label htmlFor="tag">Tag:</label>
        <select
          id="tag"
          className={ style.select }
          value={ tag }
          data-testid="tag-input"
          onChange={ (e) => handleChange(e) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button>{ isEditing ? 'Editar despesa' : 'Adicionar despesa' }</button>
      </form>
    </main>
  );
}

export default WalletForm;

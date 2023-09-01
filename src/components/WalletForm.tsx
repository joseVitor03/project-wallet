import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, GlobalState, WalletFormType } from '../type';
import { curreciesAction, walletAction } from '../redux/actions';

function WalletForm() {
  const INITIAL_STATE = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  const dispatch: Dispatch = useDispatch();
  const [form, setForm] = useState<WalletFormType>(INITIAL_STATE);
  const [idExpense, setIdExpense] = useState<number>(0);

  const handleChange = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setForm({
      ...form,
      id: idExpense,
      [id]: value,
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setForm(INITIAL_STATE);
    setIdExpense(idExpense + 1);
    dispatch(walletAction(form));
  };

  useEffect(() => {
    async function renderCurrencies() {
      dispatch(curreciesAction());
    }
    renderCurrencies();
  }, []);

  const currencies = useSelector((state: GlobalState) => state.wallet.currencies);

  return (
    <section>
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            value={ form.value }
            data-testid="value-input"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            value={ form.description }
            data-testid="description-input"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            value={ form.currency }
            onChange={ (event) => handleChange(event) }
          >
            {currencies && (
              <>
                {currencies.map((currencie) => (
                  <option
                    key={ currencie }
                    value={ currencie }
                  >
                    {currencie}
                  </option>
                ))}
              </>)}
          </select>
        </label>
        <label htmlFor="method">
          Metodo de pagamento:
          <select
            data-testid="method-input"
            value={ form.method }
            id="method"
            onChange={ (event) => handleChange(event) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Credito">Cartão de crédito</option>
            <option value="Debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            data-testid="tag-input"
            value={ form.tag }
            id="tag"
            onChange={ (event) => handleChange(event) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button onClick={ (event) => handleClick(event) }>Adicionar despesa</button>
      </form>
    </section>
  );
}

export default WalletForm;

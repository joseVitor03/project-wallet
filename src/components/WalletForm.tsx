import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, GlobalState } from '../type';
import { curreciesAction } from '../redux/actions';

function WalletForm() {
  const dispatch: Dispatch = useDispatch();
  // const newCurrencies = currencies.map((curr) => curr[0]);
  // console.log(newCurrencies);

  useEffect(() => {
    async function renderCurrencies() {
      dispatch(curreciesAction());
    }
    renderCurrencies();
  }, []);
  const currencies = useSelector((state: GlobalState) => state.wallet.currencies);
  // console.log(currencies);

  return (
    <section>
      <form>
        <input
          type="text"
          data-testid="value-input"
        />
        <input
          type="text"
          data-testid="description-input"
        />
        <select
          id="select"
          data-testid="currency-input"
        >
          { currencies && (
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
        <select
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Credito">Cartão de crédito</option>
          <option value="Debito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button>Adicionar despesa</button>
      </form>
    </section>
  );
}

export default WalletForm;

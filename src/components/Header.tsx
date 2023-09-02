import { useSelector } from 'react-redux';
import { ReduxState } from '../type';

type PropHeader = {
  email: string,
};

function Header({ email }: PropHeader) {
  const { expenses } = useSelector((state: ReduxState) => state.wallet);

  const totalDespesas: number = expenses.reduce((sum, valueCurr) => (
    Number(valueCurr.exchangeRates[valueCurr.currency]
      .ask * Number(valueCurr.value)) + sum
  ), 0);

  return (
    <header>
      <h6 data-testid="email-field">{email}</h6>
      <h4 data-testid="total-field">{totalDespesas.toFixed(2)}</h4>
      <h4 data-testid="header-currency-field">BRL</h4>
    </header>
  );
}

export default Header;

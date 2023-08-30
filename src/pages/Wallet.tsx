import { useSelector } from 'react-redux';
import { GlobalState } from '../type';

function Wallet() {
  const { email } = useSelector((state: GlobalState) => state.user);
  return (
    <header>
      <h4 data-testid="header-currency-field">BRL</h4>
      <h4 data-testid="total-field">Despesa Total: 0</h4>
      <h6 data-testid="email-field">{email}</h6>
    </header>
  );
}

export default Wallet;

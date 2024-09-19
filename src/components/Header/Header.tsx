import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GlobalState } from '../../type';
import styles from './header.module.css';

function Header() {
  const { email } = useSelector((state: GlobalState) => state.user);
  const { expenses } = useSelector((state: GlobalState) => state.wallet);
  const [totalExpenses, setTotalExpenses] = useState(0);
  useEffect(() => {
    const total = expenses.reduce((sum, valueCurr) => (
      Number(valueCurr.exchangeRates[valueCurr.currency].ask)
      * Number(valueCurr.value) + sum), 0);
    setTotalExpenses(total);
  }, [expenses]);
  return (
    <header className={ styles.header }>
      <h6 data-testid="email-field">{`Email: ${email}`}</h6>
      <h4
        className={ styles.total }
        data-testid="total-field"
      >
        {totalExpenses.toFixed(2)}
      </h4>
      <h4 data-testid="header-currency-field">BRL</h4>
    </header>
  );
}

export default Header;

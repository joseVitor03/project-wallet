import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ReduxState } from '../type';

type PropHeader = {
  email: string,
};

function Header({ email }: PropHeader) {
  const [despesas, setDespesas] = useState<number>(0);
  const { expenses } = useSelector((state: ReduxState) => state.wallet);
  const data = useSelector((state: ReduxState) => state);

  console.log(data);

  useEffect(() => {
    const totalDespesas: number = expenses.reduce((sum, valueCurr) => (
      Number(valueCurr.exchangeRates[valueCurr.currency]
        .ask * Number(valueCurr.value)) + sum
    ), 0);
    console.log(totalDespesas);
    setDespesas(totalDespesas);
  }, [expenses]);
  return (
    <header>
      <h6 data-testid="email-field">{email}</h6>
      <h4 data-testid="total-field">{despesas.toFixed(2)}</h4>
      <h4 data-testid="header-currency-field">BRL</h4>
    </header>
  );
}

export default Header;

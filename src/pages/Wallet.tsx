import { useSelector } from 'react-redux';
import { GlobalState } from '../type';

function Wallet() {
  const { email } = useSelector((state: GlobalState) => state.user);
  return (
    <header>
      <h4>{email}</h4>
    </header>
  );
}

export default Wallet;

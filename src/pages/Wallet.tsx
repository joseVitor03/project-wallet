import { useSelector } from 'react-redux';
import { GlobalState } from '../type';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

function Wallet() {
  const { email } = useSelector((state: GlobalState) => state.user);
  return (
    <main>
      <Header email={ email } />
      <WalletForm />
    </main>
  );
}

export default Wallet;

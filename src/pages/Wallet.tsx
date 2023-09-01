import { useSelector } from 'react-redux';
import { GlobalState } from '../type';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

function Wallet() {
  const { email } = useSelector((state: GlobalState) => state.user);
  return (
    <main>
      <Header email={ email } />
      <WalletForm />
      <Table />
    </main>
  );
}

export default Wallet;

import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import style from './pages.module.css';

function Wallet() {
  return (
    <main className={ style.pageTotal }>
      <Header />
      <WalletForm />
      <Table />
    </main>
  );
}

export default Wallet;

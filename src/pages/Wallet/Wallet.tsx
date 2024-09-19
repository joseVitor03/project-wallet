import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import WalletForm from '../../components/Wallet/WalletForm';
import style from '../pages.module.css';

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

import { useSelector } from 'react-redux';
import { ReduxState } from '../type';

function Table() {
  const { expenses } = useSelector((state: ReduxState) => state.wallet);
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      {expenses && (
        <tbody>
          {expenses.map(({ description,
            tag, value, currency, exchangeRates, method }) => (
              <tr key={ description }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>
                  {Number(exchangeRates[currency].ask).toFixed(2)}
                </td>
                <td>
                  {Number(exchangeRates[currency].ask * Number(value)).toFixed(2)}
                </td>
                <td>
                  Real
                </td>
              </tr>
          ))}
        </tbody>)}
    </table>
  );
}

export default Table;

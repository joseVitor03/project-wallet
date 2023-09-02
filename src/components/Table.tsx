import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Dispatch, ReduxState } from '../type';
import { deleteAction } from '../redux/actions';

function Table() {
  const dispatch: Dispatch = useDispatch();
  const { expenses } = useSelector((state: ReduxState) => state.wallet);
  // if (expenses) {
  //   console.log(expenses);
  // }

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
            tag, value, currency, exchangeRates, method, id }) => (
              <tr key={ id }>
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
                <td>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => dispatch(deleteAction(id)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
          ))}
        </tbody>)}
    </table>
  );
}

export default Table;

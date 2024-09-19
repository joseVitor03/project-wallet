import { useDispatch, useSelector } from 'react-redux';
import style from './table.module.css';
import { Dispatch, GlobalState } from '../../type';
import { isEditing, removeAction } from '../../redux/actions';

function Table() {
  const { expenses } = useSelector((state: GlobalState) => state.wallet);
  const dispatch: Dispatch = useDispatch();
  console.log(expenses);

  return (
    <table className={ style.table }>
      <thead className={ style.thead }>
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
      <tbody className={ style.tbody }>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{Number(expense.value).toFixed(2)}</td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              {(Number(expense.exchangeRates[expense.currency].ask)
              * Number(expense.value)).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                className={ style.delete_btn }
                data-testid="delete-btn"
                onClick={ () => dispatch(removeAction(expense)) }
              >
                Excluir
              </button>
              <button
                className={ style.edit_btn }
                data-testid="edit-btn"
                onClick={ () => dispatch(isEditing(expense.id)) }
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

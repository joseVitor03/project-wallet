import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';
import App from './App';
import * as functions from './tests/helpers/helpers';
import mockData from './tests/helpers/mockData';

afterEach(() => {
  vi.clearAllMocks();
});

describe('Tests', () => {
  it('Componente Home, vereficando se possui os inputs na tela.', () => {
    renderWithRouterAndRedux(<App />);
    const placeholderEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const placeholderPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(placeholderEmail).toBeInTheDocument();
    expect(placeholderPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('Testando validações do componente Home com dados corretos.', async () => {
    renderWithRouterAndRedux(<App />);
    const placeholderEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const placeholderPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    await userEvent.type(placeholderEmail, 'zezin@gmail.com');
    await userEvent.type(placeholderPassword, '12345678');

    expect(button).toBeEnabled();
  });
  it('Testando validações do componente Home com dados incorretos.', async () => {
    renderWithRouterAndRedux(<App />);
    const placeholderEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const placeholderPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    await userEvent.type(placeholderEmail, 'zezin@.com');
    await userEvent.type(placeholderPassword, '12345678');

    expect(button).toBeDisabled();
  });
  it('testando o componente Wallet, verificando se está renderinzado tudo normalmente.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const emailUser = screen.getByTestId('value-input');
    const expenses = screen.getByRole('heading', {
      name: /0\.00/i,
    });
    const coinBRL = screen.getByRole('heading', {
      name: /brl/i,
    });
    const placeHolderValue = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const placeHolderDescription = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const selectCoin = screen.getByRole('combobox', {
      name: /moeda:/i,
    });
    const payment = screen.getByRole('combobox', {
      name: /metodo de pagamento:/i,
    });
    const tagFood = screen.getByRole('combobox', {
      name: /tag/i,
    });
    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(emailUser).toBeInTheDocument();
    expect(expenses).toBeInTheDocument();
    expect(coinBRL).toBeInTheDocument();
    expect(placeHolderValue).toBeInTheDocument();
    expect(placeHolderDescription).toBeInTheDocument();
    expect(selectCoin).toBeInTheDocument();
    expect(payment).toBeInTheDocument();
    expect(tagFood).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('testando o redirecionamento entre os componentes', async () => {
    renderWithRouterAndRedux(<App />);
    const placeholderEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const placeholderPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    await userEvent.type(placeholderEmail, 'zezin@gmail.com');
    await userEvent.type(placeholderPassword, '12345678');
    await userEvent.click(button);

    const emailUser = await screen.findByTestId('value-input');
    expect(emailUser).toBeInTheDocument();
  });
  it('teste se o valor da despesa altera', async () => {
    // LEMBRAR DE FAZER UMA FUNCAO PARA RETORNAR O WALLET PARA FAZER O MOCK DPS E INSERIR ELA NO LUGAR DO FETCH DA FUNCAO WALLETACTION
    // const expense = {
    //   value: '11',
    //   currency: 'USD',
    //   method: 'Cartão de crédito',
    //   tag: 'Lazer',
    //   description: 'Onze dólares',
    //   exchangeRates: mockData,
    // };
    vi.spyOn(functions, 'fetchFunction').mockResolvedValue(mockData);
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    await userEvent.click(button);

    // const despesas = screen.getByTestId('total-field');
    expect(functions.fetchFunction).toHaveBeenCalled();
  });
  it('testando se o componente table esta renderizando', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const placeValue = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const description = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    await userEvent.type(placeValue, '5');
    await userEvent.type(description, 'coxinha');
    await userEvent.click(button);
    expect(await screen.findByText('5.00')).toBeInTheDocument();
  });
});

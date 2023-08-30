type PropHeader = {
  email: string,
};

function Header({ email }: PropHeader) {
  return (
    <header>
      <h6 data-testid="email-field">{email}</h6>
      <h4 data-testid="total-field">0</h4>
      <h4 data-testid="header-currency-field">BRL</h4>
    </header>
  );
}

export default Header;

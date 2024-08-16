const convertCurrencySign = (currency: string) => {
  switch (currency) {
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    case 'CAD':
      return '$';
    case 'UAH':
      return '₴';
    default:
      return '';
  }
};

export default convertCurrencySign;

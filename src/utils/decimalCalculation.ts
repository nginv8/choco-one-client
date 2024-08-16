import Decimal from 'decimal.js';

export const toDecimal = (value: number | string | Decimal) => {
  if (value instanceof Decimal) return value;
  const valueString = typeof value === 'number' ? value.toString() : value;
  return new Decimal(valueString);
};

export const decimalToNumber = (decimal: Decimal) => parseFloat(decimal.toFixed(2));

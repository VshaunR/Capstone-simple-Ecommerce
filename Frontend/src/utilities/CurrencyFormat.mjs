const CurrencyFormatter = new Intl.NumberFormat(undefined,{
  currency:'USD',
  style:'currency'
});

export function formatCurrency(num){


  return CurrencyFormatter.format(num)
}
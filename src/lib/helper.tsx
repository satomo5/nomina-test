export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function currencyFormat(number: number) {
  const Currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedNumber = Currency.format(number);
  return formattedNumber.replace(/\.0+$/, "");
}

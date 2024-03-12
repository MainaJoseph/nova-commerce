export const FormatNumber = (digit: number) => {
  return new Intl.NumberFormat("en-US").format(digit);
};

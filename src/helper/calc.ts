const divide = (n: number, d: number) => (n === 0 ? n : n / d);

const round = (n: number, d: number) => Number(n.toFixed(d));
export {
  // eslint-disable-next-line import/prefer-default-export
  divide,
  round,
};

export const price = (price: string) => {
  const str = `$ ${parseFloat(price)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  return str === "NaN" ? "加载中..." : str;
};

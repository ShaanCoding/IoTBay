export function convertToCurrency(price: number): string {
  if (!price) return "N/A";

  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

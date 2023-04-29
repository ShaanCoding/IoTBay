export function convertToDDMMYYYY(lastUpdated: Date): string {
  if (!lastUpdated) return "N/A";

  return lastUpdated.toLocaleDateString("en-GB", {
    // you can use undefined as first argument
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

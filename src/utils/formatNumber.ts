export function formatNumber(value: number, maximumFractionDigits = 0) {
  return value.toLocaleString("ko", { maximumFractionDigits });
}

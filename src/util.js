export default function formatCurrency(num) {
  debugger
  return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
}

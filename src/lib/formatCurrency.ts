const format = (amount: number, curr: string = 'KES') => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: curr,
  }).format(amount)
}
export default format

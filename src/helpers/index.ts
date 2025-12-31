export  const formatCurrency = (cantidad: number) => {
  return Number(cantidad).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
export  const formatCurrency = (cantidad: number) => {
  return Number(cantidad).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const formatDate = (fecha: Date) => {
  const nuevaFecha = new Date(fecha)
  const opciones: Intl.DateTimeFormatOptions = {
    // year: 'numeric',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }
  return nuevaFecha.toLocaleDateString('es-ES', opciones)
}
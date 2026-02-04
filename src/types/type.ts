export type Budget = {
  amount: number  // * number para que se almacene como INT en el Componente App
}

export type Gasto = {
  id: string,
  nombre: string
  cantidad: number
  categoria: string,
  date: Date,
}
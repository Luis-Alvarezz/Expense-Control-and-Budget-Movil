export type Budget = {
  amount: number  // * number para que se almacene como INT en el Componente App
}

export type Gasto = {
  id: string,
  nombre: string
  cantidad: number
  // categoria: Categoria,
  categoria: string,
  date: Date,
}

// export type Categoria = 'ahorro' | 'casa' | 'comida' | 'gastos' | 'ocio' | 'salud' | 'suscripciones'
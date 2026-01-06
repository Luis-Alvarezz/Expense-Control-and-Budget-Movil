// * ControlPresupuesto
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles'
import AmountDisplay from './AmountDisplay'
import { Gasto } from '../types/type'


type BudgetTrackerProp = {
  presupuesto: number,
  gastos: Gasto[]
}

export default function BudgetTracker({ presupuesto, gastos }: BudgetTrackerProp) {
  const [disponible, setDisponible] = useState<number>(0)
  const [gastado, setGastado] = useState<number>(0)

  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + total, 0  ) // * total o acumulativo, elemento del arreglo
    /*
      { id: 1, cantidad: 30 },
      { id: 2, cantidad: 40 },
      { id: 3, cantidad: 50 },
      
      iteracion 1: total -> 0 | Cantidad -> 30
      iteracion 2: 0 + 30 -> 30| Cantidad -> 40
      iteracion 3: 30 + 40 -> 70 | Cantidad -> 50
      iteracion 4: 70 + 50 -> 120 | Cantidad -> Proximo Valor de Objeto
    */
    // console.log(totalGastado) // * Efectivamente muestra 120
    setGastado(totalGastado)

    const totalDisponible = presupuesto - totalGastado
    setDisponible(totalDisponible)
  }, [gastos, presupuesto])

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <Image source={ require('../img/grafico.jpg') } style={styles.imagen} />
      </View>

      <View style={styles.contenedorTexto}>

        <Text>
          <AmountDisplay
            label="Budget"
            amount={presupuesto}
          />
        </Text>

        <Text>
          <AmountDisplay
            label="Availability"
            amount={disponible}
          />
        </Text>

        <Text>
          <AmountDisplay
            label="Spent"
            amount={gastado}
          />
        </Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: { 
    ...globalStyles.contenedor 
  },

  centrarGrafica: {
    alignItems: "center",
  },

  imagen: {
    width: 250,
    height: 250,
  },

  contenedorTexto: {
    marginTop: 50,
  }
})
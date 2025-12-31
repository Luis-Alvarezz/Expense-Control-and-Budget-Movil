// * ControlPresupuesto
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles'
import AmountDisplay from './AmountDisplay'


type BudgetTrackerProp = {
  presupuesto: string
}

export default function BudgetTracker({ presupuesto }: BudgetTrackerProp) {
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
            amount={presupuesto}
          />
        </Text>

        <Text>
          <AmountDisplay
            label="Spent"
            amount={presupuesto}
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
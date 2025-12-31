// * ControlPresupuesto
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles'

export default function BudgetTracker() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <Image source={ require('../img/grafico.jpg') } style={styles.imagen} />
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
  }
})
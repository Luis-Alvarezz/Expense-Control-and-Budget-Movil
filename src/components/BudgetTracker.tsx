// * ControlPresupuesto
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles'
import AmountDisplay from './AmountDisplay'
import { Gasto } from '../types/type'
import CircularProgress from 'react-native-circular-progress-indicator'

type BudgetTrackerProp = {
  presupuesto: number,
  gastos: Gasto[]
}

export default function BudgetTracker({ presupuesto, gastos }: BudgetTrackerProp) {
  const [disponible, setDisponible] = useState<number>(0)
  const [gastado, setGastado] = useState<number>(0)
  const [ porcentaje, setPorcentaje ] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + total, 0  ) // * total o acumulativo, elemento del arreglo
    const totalDisponible = presupuesto - totalGastado

    const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto) * 100
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
    setDisponible(totalDisponible)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000)
  }, [gastos, presupuesto])

  // const porcentajeBudget = (budget: number) => {
  //   const porcentajeTotal = (totalGastado / budget) * 100
  //   return porcentajeTotal
  // }

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        {/* <Image source={ require('../img/grafico.jpg') } style={styles.imagen} /> */}
        <CircularProgress
          value={porcentaje}
          maxValue={100}
          duration={1000}
          radius={150}
          valueSuffix={'%'}
          // valuePrefix={'$'}
          title={'Gastado'}
          inActiveStrokeColor='#F5F5F5'// * Parte Inactiva
          inActiveStrokeWidth={20} // * Grosor de la Linea Inactiva
          activeStrokeColor='#3B82F6' // * Color de lo Gastado
          activeStrokeWidth={20} // * Grosor de lo Gastado
          titleStyle={ styles.tituloCircularPosgress }
          // titleColor='#64748B'
        />
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
  },

  tituloCircularPosgress: {
    fontWeight: '700', 
    fontSize: 25,
  }
})
// * rafc > Para mostrar cada gasto a detalle desde Componente ExpenseList.tsx
import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { Categoria, Gasto } from '../types/type'
import { formatCurrency, formatDate } from '../helpers'
import globalStyles from '../styles'

type ExpenseDetailProp = {
  gasto: Gasto
}

// const diccionarioIconos = { // * TS infiere diccionarioIconos como Objeto con keys especificas pero [categoria] es string
const diccionarioIconos: Record <Categoria, any> = {
  ahorro: require(`../img/icono_ahorro.png`),
  casa: require(`../img/icono_casa.png`),
  comida: require(`../img/icono_comida.png`),
  gastos: require(`../img/icono_gastos.png`),
  ocio: require(`../img/icono_ocio.png`),
  salud: require(`../img/icono_salud.png`),
  suscripciones: require(`../img/icono_suscripciones.png`),
}

export const ExpenseDetail = ({ gasto }: ExpenseDetailProp) => {
  const { nombre, categoria, cantidad, date } = gasto
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenido}>
        <View style={styles.contenedorImagenTexto}>
          <Image source={diccionarioIconos[categoria]} style={styles.imagenIcono} />
          <View style={styles.contenedorTexto}>
            <Text style={styles.categoria}>{categoria}</Text>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.date}>{formatDate(date)} - {date.toLocaleTimeString()}</Text>
          </View>
        </View>
        <Text style={styles.cantidad}>{formatCurrency(cantidad)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 20,
  },

  contenido: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  contenedorImagenTexto: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    // flex: 1,
  },
  imagenIcono: {
    width: 80,
    height: 80,
  },

  contenedorTexto:{
    // flex: 1, // * Empuja de mas inclusive al la cantidad, ajustamos la imagen
    // backgroundColor: 'red',
  },
  categoria: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 22,
    color: '#64748B',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: 'bold',
  },
  cantidad: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})

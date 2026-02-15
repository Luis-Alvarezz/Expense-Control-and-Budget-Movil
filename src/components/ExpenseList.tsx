// * rafc -> 
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Gasto } from '../types/type'
import { ExpenseDetail } from './ExpenseDetail'

type ExpenseListProp = {
  gastos: Gasto[],
  setModal: (value: boolean) => void,
  setEditGasto: (gastoEditar: Gasto) => void
}

export const ExpenseList = ({ gastos, setModal, setEditGasto }: ExpenseListProp) => {

  const isEmpty = !gastos || gastos.length === 0
  
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Listado de Gastos</Text>
      { isEmpty ? 
        <Text style={styles.noGastoTitulo}>No hay gastos</Text> :
        gastos.map(gasto => {
          return (
            <ExpenseDetail
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setEditGasto={setEditGasto}// * setModal y setEditGasto viene desde App.tsx->ExpenseList->ExpenseDetail.tsx esto se EVITA con ContextAPI o REDUX
            />
          ) 
        })  
      }
    </View>
  )
}


const styles = StyleSheet.create({
  contenedor: {
    marginTop: 20,
    marginBottom: 100,
  },
  titulo: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
  noGastoTitulo: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    color: '#E53E3E',
    fontWeight: '500',
  }
})
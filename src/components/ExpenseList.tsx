// * rafc -> 
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Gasto } from '../types/type'
import { ExpenseDetail } from './ExpenseDetail'

type ExpenseListProp = {
  gastos: Gasto[],
  setModal: (value: boolean) => void,
  setEditGasto: (gastoEditar: Gasto) => void
  filtro: String
  gastosFiltrados: Gasto[]

}

export const ExpenseList = ({ gastos, setModal, setEditGasto, filtro, gastosFiltrados }: ExpenseListProp) => {
  
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Listado de Gastos</Text>

      { filtro ? gastosFiltrados.map( gasto => (
        <ExpenseDetail
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setEditGasto={setEditGasto}// * setModal y setEditGasto viene desde App.tsx->ExpenseList->ExpenseDetail.tsx esto se EVITA con ContextAPI o REDUX
            />
      ) ) : 
        gastos.map( gasto => (
           <ExpenseDetail
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setEditGasto={setEditGasto}// * setModal y setEditGasto viene desde App.tsx->ExpenseList->ExpenseDetail.tsx esto se EVITA con ContextAPI o REDUX
            />
        ))
      }

      { (gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
        <Text style={styles.noGastoTitulo}>No hay Gastos</Text>
      )}

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
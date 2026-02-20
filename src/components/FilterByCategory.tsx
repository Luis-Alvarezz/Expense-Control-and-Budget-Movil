import React, { useEffect, Dispatch, SetStateAction } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'
import { Gasto } from '../types/type'

type FilterByCategoryProp = {
  filtro: string
  setFiltro: (filtro: string) => void
  gastos: Gasto[],
  // setGastosFiltrados: (gastoFiltrado: Gasto[] | null) => void // * ERROR en App.tsx:  Type 'Gasto[]' is not assignable to type 'SetStateAction<Gasto | null>' 
  setGastosFiltrados: Dispatch<SetStateAction<Gasto[]>>
}

export const FilterByCategory = ({ filtro, setFiltro, gastos, setGastosFiltrados }: FilterByCategoryProp) => {

  useEffect(() => {
    // console.log('Ya cambio el filtro');
    if (filtro === '') {
      setGastosFiltrados([])
    } else {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
    
  }, [filtro, setGastosFiltrados, gastos])

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtrar Gastos</Text>
      <Picker
        style={styles.picker}
        dropdownIconColor="#1E293B" // flechita Android
        selectedValue={filtro}
        onValueChange={(filtroValue) => { // ! Toma el Value del picker en base la seleccion del usuario
          setFiltro(filtroValue) // ! y lo manda por el PROP 'setFiltro' Para trabajar con el mediante 'filtro'
        }}
      >
        <Picker.Item label="-- Seleccione Categoria --" value={null} />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Gastos Variados" value="gastos" />
        <Picker.Item label="Ocio" value="ocio" />
        <Picker.Item label="Salud" value="salud" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    transform: [{ translateY: 0 }],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#64748B',
  },
  picker: {
    color: '#1E293B',
  },
})
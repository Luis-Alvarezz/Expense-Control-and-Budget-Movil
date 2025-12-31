import React from 'react'
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { Budget } from '../types/type'
import { useState } from 'react'
import globalStyles from '../styles'
// ! nuevoPresupuesto.js

type BudgetFormType = {
  handleNuevoPresupuesto: (presupuesto: Budget) => void
}


export const BudgetForm = ({handleNuevoPresupuesto}: BudgetFormType) => {
  const [presupuesto, setPresupuesto] = useState<string>('')
  
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>

      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Agrega tu Presupuesto Ej. 300'
        value={presupuesto}
        onChangeText={setPresupuesto} // * Para leer lo que vayamos colocando
      />

      <Pressable
       style={styles.boton}
       onPress={() => handleNuevoPresupuesto({ amount: Number(presupuesto) })}
      >
        <Text style={styles.botontexto}>Definir Presupuesto</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: globalStyles.contenedor,

  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  botontexto: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})
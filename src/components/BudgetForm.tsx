import React from 'react'
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { Budget } from '../types/type'
import { useState } from 'react'
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
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
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
  contenedor: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 20,
    // transform: translateY(50px) // * Propiedad de CSS con Js
    transform: [{ translateY: 60 }], // * 60 PX
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

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
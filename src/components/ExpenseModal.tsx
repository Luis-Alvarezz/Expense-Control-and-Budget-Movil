// * rafce - formularioGasto.js
import React from 'react'
import { Text, View, StyleSheet, Pressable, TextInput, ScrollView, Alert } from 'react-native'
import globalStyles from '../styles'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { Categoria, Gasto } from '../types/type'
import { v4 as uuidv4 } from 'uuid'

type ExpenseModalProps = {
  modal: boolean,
  setModal: (value: boolean) => void
  handleGastos: (gasto: Gasto) => void
  setEditGasto: (GastoEditar: Gasto | null) => void
}

const ExpenseModal = ({ modal, setModal, handleGastos, setEditGasto }: ExpenseModalProps) => {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())

  // ! Normlizar el DATE cuando cambia
  const handleDateChange = (selectedDate: Date) => {
    const cleanDate = new Date(selectedDate)
    cleanDate.setHours(0, 0, 0, 0)
    setDate(cleanDate)
  }

  // ! Normlizar el TIME cuando cambia
  const handleTimeChange = (selectedTime: Date) => {
    const cleanTime = new Date(selectedTime)
    cleanTime.setSeconds(0,0)
    setTime(cleanTime)
  }

  // ! Validacion de gastos
  const handleSubmit = () => {
    // * Opcion 2 de ID unico: id: Date.now()
    // * Opcion 3 de ID unico: id: Math.random().toString(36).substring(2, 10)

    // * Opcion 1 de FECHA: Date.now().toString(36)
    // * Opcion 2: date.toISOString(),

    const fechaFinal = new Date(date)
    fechaFinal.setHours(
      time.getHours(),
      time.getMinutes(),
      0,
      0
    )
     if (!nombre.trim() || !cantidad.trim() || !categoria) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }
    handleGastos({
      id: uuidv4(),
      nombre,
      cantidad: Number(cantidad),
      // categoria: categoria!, // * ! -> non-null assertion --> Es forzar a Ts a que confie en mi y eso NO esta bien
      categoria: categoria,
      date: fechaFinal
    })
  }

  return (
    <ScrollView 
      contentContainerStyle={ styles.factorCrecimiento }
      keyboardShouldPersistTaps="handled" // ! Evitar que el teclado bloquee el scroll
    >
      <View style={styles.contenedor}>
        <View>
          <Pressable
            onPress={() => {
              setModal(!modal)
              setEditGasto(null)
            }}
            style={styles.botonCancelar}
          >
            <Text
              style={styles.botonCancelarTexto}
            > 
              Cancelar
            </Text>
          </Pressable>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.titulo}>Nuevo Gasto</Text>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre del Gasto</Text>
            <TextInput
              placeholder='Añade el nombre del gasto'
              style={styles.input}
              placeholderTextColor="#64748B"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Cantidad</Text>
            <TextInput
              placeholder='Añade la cantidad del gasto. ej:300'
              placeholderTextColor="#64748B"
              keyboardType='numeric'
              style={styles.input}
              value={cantidad}
              onChangeText={setCantidad}
              maxLength={8}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Categoria</Text>
            <Picker
              style={styles.picker}
              dropdownIconColor="#1E293B" // flechita Android
              selectedValue={categoria}
              onValueChange={(itemValue: Categoria | null) => {
                setCategoria(itemValue)
              }} // * Para Leer lo que el usuario selecciona en Memoria
            >
              <Picker.Item label="-- Seleccione --" value={null} />
              <Picker.Item label="Ahorro" value="ahorro" />
              <Picker.Item label="Comida" value="comida" />
              <Picker.Item label="Casa" value="casa" />
              <Picker.Item label="Gastos Variados" value="gastos" />
              <Picker.Item label="Ocio" value="ocio" />
              <Picker.Item label="Salud" value="salud" />
              <Picker.Item label="Suscripciones" value="suscripciones" />
            </Picker>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha y Hora Gasto</Text>

            <View style={styles.dateColumn}>
              <View style={styles.dateBox}>
                <DatePicker
                  mode="date"
                  theme="light"
                  date={date}
                  onDateChange={handleDateChange}
                />
              </View>

              <View style={styles.dateBox}>
                <DatePicker
                  mode="time"
                  theme="light"
                  date={time}
                  onDateChange={handleTimeChange}
                />
              </View>
            </View>
          </View>

          <Pressable style={styles.submitBTN}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.submitBTNTexto}>Agregar Gasto</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  factorCrecimiento: {
    flexGrow: 1 // ! Basicamente es el factor de crecimiento en Flexbox.
  },
  contenedor: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  campo: {
    marginVertical: 10
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748B'
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    color: '#64748B',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },

  picker: {
    color: '#1E293B',
  },

  submitBTN: {
    backgroundColor: '#3B82F7',
    padding: 10,
    marginTop: 10,
  },
  submitBTNTexto: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  botonCancelar: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginTop: 30,
    marginHorizontal: 20,
  },
  botonCancelarTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },


  dateColumn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBox: {
    flex: 1, // ? Para que AMBOS PICKERS midan lo mismo
    alignItems: 'center',
  }
})

export default ExpenseModal
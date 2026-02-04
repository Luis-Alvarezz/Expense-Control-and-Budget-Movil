import { StyleSheet, View, Alert, Pressable, Image, Modal } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Header from './src/img/components/Header'; // * Si fuese el Componente export default function Header() {  }
import { Header } from './src/components/Header';
import { BudgetForm } from './src/components/BudgetForm';
import { Budget, Gasto } from './src/types/type';
import { useState } from 'react';
import BudgetTracker from './src/components/BudgetTracker'; // * Control Presupuesto
import ExpenseModal from './src/components/ExpenseModal';
import 'react-native-get-random-values'

const App = () => {
  const [isValidPresupuesto, setIsValidPresupusto] = useState<boolean>(false) // * false hasta que el usuario ingrese un valor
  const [presupuesto, setPresupuesto] = useState<string>('')
  // const [gastos, setGastos] = useState<Array<{ id: number, cantidad: number }>>([
  //     { id: 1, cantidad: 30 },
  //     { id: 2, cantidad: 40 },
  //     { id: 3, cantidad: 50 },
  //   ])
  // const [gastos, setGastos] = useState<Array<Gasto>>([])
  const [ gastos, setGasto ] = useState<Gasto[]>([])
  const [ modal, setModal ] = useState<boolean>(false)

  const handleNuevoPresupuesto = (presupuestoIngresado: Budget) => {
    // console.log('Desde App...', presupuesto)
    // console.log(typeof presupuesto)
    // console.log(typeof presupuesto.amount)
    // console.log('Presupuesto ->', presupuesto)
    // console.log('Presupuesto.amount ->', presupuesto.amount)
    if (Number(presupuestoIngresado.amount) > 0) {
      // console.log('Si pasa')
      // ! Desmontar el componente de BudgetForm y mostrar la visualización de expenses
      setIsValidPresupusto(true)
    }
    else {
      // console.log('No pasa')
      Alert.alert('Error', 'El Presupuesto no puede ser cero o negativo', [{ text: 'Ok'}])
    }
  }

  // ! Validar Gastos
  const handleGastos = (gasto: Gasto) => {
    // console.log('Desde gastos', gasto)
    // console.log(Object.keys(gasto)) // * REVISA LA PARTE IZQUIERDA DEL OBJETO 
    // console.log(Object.values(gasto)) // * REVISA LA PARTE DERECHA DEL OBJETO 
    // console.log(gasto.date) // * CAMBIO porque en el TYPE paso de date: string a date: Date
    // console.log(gasto.time)
    // console.log('Date: ', gasto.date.toLocaleDateString())
    // console.log('TIME:', gasto.date.toLocaleTimeString())
    // console.log('FINAL:', gasto.date.toString())
    // console.log('FECHA: ', gasto.date.toString()) // * RECIBE -> Sun May 02 2027 23:01:00 GMT-0600
    // return

    if (Object.values(gasto).includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'OK'}])
      return
    }

    const hour = gasto.date.getHours()
    if (hour >= 23 || hour < 6) {
      Alert.alert(
        'Horario No permitido',
        'Los gastos se registran en un horario de 6:00 am y 11:00 pm'
      )
      return // * Equivalente al else
    }

    // * Anadir el gasto al STATE
    setGasto([...gastos, gasto])
    setModal(!modal)
  }

  return (
    <View style={styles.contenedor}>

      <View style={styles.header}>
        <Header />

        { !isValidPresupuesto ? // * Si NO es válido el presupuesto, muestra el formulario
          <BudgetForm
            handleNuevoPresupuesto={handleNuevoPresupuesto}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
          />
        :
          // *Si SÍ es válido, muestra el tracker
          <BudgetTracker
            presupuesto={Number(presupuesto)}
            gastos={gastos}
          />
        }
      </View>

      { modal && (
        <Modal
          visible={modal}
          animationType='slide'
          onRequestClose={() => {
            setModal(!modal)
          }}
        >
          <ExpenseModal 
            modal={modal}
            setModal={setModal}
            handleGastos={handleGastos}
          />
        </Modal>
      )}

      { isValidPresupuesto && ( // * Cuando haya un prespuesto valido, muestra:
      <>
        {/* <Text>Hola</Text> */}
        <Pressable
          style={styles.botonFlotante}
          onPress={() => setModal(!modal)}
        >
          {/* <Text>Presiona Aqui</Text> */}
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      </>
      ) }

    </View>
  );
}


const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    paddingTop: 50,
  },

  botonFlotante: {
    position: 'absolute',
    bottom: 160,
    right: 20,
  },
  imagen: {
    width: 60,
    height: 60
  }
});

export default App;

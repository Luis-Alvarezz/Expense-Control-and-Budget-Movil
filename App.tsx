import { StyleSheet, View, Alert } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import Header from './src/img/components/Header'; // * Si fuese el Componente export default function Header() {  }
import { Header } from './src/components/Header';
import { BudgetForm } from './src/components/BudgetForm';
import { Budget } from './src/types/type';
import { useState } from 'react';
import BudgetTracker from './src/components/BudgetTracker'; // * Control Presupuesto

const App = () => {
  const [isValidPresupuesto, setIsValidPresupusto] = useState<boolean>(false)

  const handleNuevoPresupuesto = (presupuesto: Budget) => {
    // console.log('Desde App...', presupuesto)
    // console.log(typeof presupuesto)
    // console.log(typeof presupuesto.amount)
    // console.log('Presupuesto ->', presupuesto)
    // console.log('Presupuesto.amount ->', presupuesto.amount)
    if (Number(presupuesto.amount) > 0) {
      // console.log('Si pasa')
      // ! Desmontar el componente de BudgetForm y mostrar la visualización de expenses
      setIsValidPresupusto(true)
    }
    else {
      // console.log('No pasa')
      Alert.alert('Error', 'El Presupuesto no puede ser cero o negativo', [{ text: 'Ok'}])
    }
  }

  return (
    <View style={styles.contenedor}>

      <View style={styles.header}>
        <Header />

        { !isValidPresupuesto ?
          <BudgetForm
            handleNuevoPresupuesto={handleNuevoPresupuesto} 
          />
        : 
          <BudgetTracker />
        }
      </View>

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
});

export default App;

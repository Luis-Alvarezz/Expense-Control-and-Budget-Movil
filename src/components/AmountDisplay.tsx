import { Text, StyleSheet } from 'react-native'
import { formatCurrency } from '../helpers'

type AmountDisplayProps = {
  label: string,
  amount: string
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
  return (
    <Text style={styles.label}>
      {/* {label}: {''} */}
      { label && `${label}: ` }
      <Text style={styles.span}>
        { formatCurrency(Number(amount)) }
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    color: '#3B82F6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  span: {
    fontWeight: 'black',
    color: '#000'
  }
})

/*
  evaluación lógica AND:
  Si label tiene un valor truthy (texto, string no vacío), entonces React renderiza lo que está después del &&.
  Si label es undefined, null, '' (string vacío), 0, false, entonces NO renderiza nada.

  label = "Presupuesto"  --> muestra "Presupuesto: "
  label = "Disponible"   --> muestra "Disponible: "
  label = "" (string vacío)  --> NO muestra nada
  label = undefined  --> NO muestra nada

*/
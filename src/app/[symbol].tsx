import { View, Text } from '@/src/components/Themed'
import { Stack, useLocalSearchParams } from 'expo-router'
import * as Array from 'fp-ts/Array'
import * as Option from 'fp-ts/Option'
import * as StockModel from '@/src/model/Stock'
import { Alert, StyleSheet } from 'react-native'
import StockListItem from '../components/StockListItem'
import Graph from '../components/Graph'

const Details = () => {
  const { symbol } = useLocalSearchParams()
  const stock: Option.Option<StockModel.Model> = Array.findFirst(
    (stock: StockModel.Model) => stock.symbol == symbol
  )(StockModel.TestData)

  if (Option.isNone(stock)) {
    Alert.alert(`Stock with symbol ${symbol} could not be found`)

    return <Text>Stock with symbol {symbol} could not be found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Stock details for ${stock.value.symbol}`,
          headerBackTitleVisible: false
        }}
      />
      <StockListItem stock={stock.value} />
      <Graph />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
})

export default Details

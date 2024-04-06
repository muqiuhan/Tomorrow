import { View, Text } from '@/src/components/Themed'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Top5TestData } from '../update/Stock'
import * as Array from 'fp-ts/Array'
import * as Option from 'fp-ts/Option'
import * as Fun from 'fp-ts/function'
import { Alert, StyleSheet } from 'react-native'
import Stock from '../model/Stock'
import { ReactElement } from 'react'
import StockListItem from '../components/StockListItem'

const Details = () => {
  const { symbol } = useLocalSearchParams()
  const stock: Option.Option<Stock> = Array.findFirst((stock: Stock) => stock.symbol == symbol)(Top5TestData)

  if (Option.isNone(stock)) {
    Alert.alert(`Stock with symbol ${symbol} could not be found`)

    return (
      <Text>Stock with symbol {symbol} could not be found</Text>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: `Stock details for ${stock.value.symbol}`,
        headerBackTitleVisible: false
      }}
      />
      <StockListItem stock={stock.value} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
})

export default Details

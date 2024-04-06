import { Text, View } from './Themed'
import { Alert, StyleSheet } from 'react-native'
import Stock from '@/src/model/Stock'
import Colors from '@/src/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { MonoText } from './StyledText'
import { PercentChangeInfo } from '../update/Stock'
import * as Either from 'fp-ts/Either'
import * as Fun from 'fp-ts/function'

interface StockListItem {
  stock: Stock
}

const StockListItem = ({ stock }: StockListItem): React.JSX.Element => {
  const [percentChangeColor, percentChangePrefix, percentChange] =
        Fun.pipe(
          PercentChangeInfo(stock.percent_change),
          Either.match(
            (err) => Alert.prompt(err),
            (info) => info
          )
        )

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.symbol}>
          {stock.symbol}
          <AntDesign name='staro' size={18} color='grey' />
        </Text>
        <Text style={styles.name}> {stock.name} </Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <MonoText style={{}}> {Number.parseFloat(stock.close).toFixed(1)} </MonoText>
        <MonoText style={{ color: percentChangeColor }}>
          {percentChangePrefix}
          {percentChange}%
        </MonoText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint
  },
  name: {
    color: 'grey'
  }
})

export default StockListItem

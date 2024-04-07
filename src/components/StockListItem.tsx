import { Text, View } from './Themed'
import { Alert, Pressable, StyleSheet } from 'react-native'
import * as StockFun from '@/src/update/Stock'
import Colors from '@/src/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { MonoText } from './StyledText'
import * as Either from 'fp-ts/Either'
import * as Fun from 'fp-ts/function'
import { Link } from 'expo-router'

interface StockListItem {
  stock: Stock
}

const StockListItem = ({ stock }: StockListItem): React.JSX.Element => {
  const [percentChangeColor, percentChangePrefix, percentChange] = Fun.pipe(
    StockFun.PercentChangeInfo(stock.percent_change),
    Either.match(
      (err) => {
        Alert.prompt(err)
        return ['grey', '', 'ERROR']
      },
      (info) => info
    )
  )

  return (
    <Link href={`/${stock.symbol}`} asChild>
      <Pressable style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.symbol}>
            {stock.symbol}
            <AntDesign name='staro' size={18} color='grey' />
          </Text>
          <Text style={styles.name}> {stock.name} </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <MonoText style={{}}>
            {' '}
            {Number.parseFloat(stock.close).toFixed(1)}{' '}
          </MonoText>
          <MonoText style={{ color: percentChangeColor }}>
            {percentChangePrefix}
            {percentChange} %
          </MonoText>
        </View>
      </Pressable>
    </Link>
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

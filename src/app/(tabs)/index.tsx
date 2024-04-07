import { FlatList, StyleSheet } from 'react-native'
import { View } from '@/src/components/Themed'
import { Stack } from 'expo-router'
import StockListItem from '@/src/components/StockListItem'
import * as StockModel from '@/src/model/Stock'

export default function TabOneScreen () {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Stocks' }} />

      <FlatList
        data={StockModel.TestData}
        renderItem={(({ item }) => <StockListItem stock={item} />)}
        contentContainerStyle={{ gap: 20, padding: 10 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

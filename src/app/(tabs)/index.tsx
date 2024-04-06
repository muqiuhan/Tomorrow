import { FlatList, StyleSheet } from 'react-native'
import { Text, View } from '@/src/components/Themed'
import { Stack } from 'expo-router'
import StockListItem from '@/src/components/StockListItem'
import { Top5TestData } from '@/src/update/Stock'

export default function TabOneScreen () {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Stocks' }} />

      <FlatList
        data={Top5TestData}
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

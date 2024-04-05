import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Stack } from 'expo-router';
import { Effect, Console } from 'effect';
import top5 from "@/assets/data/top5.json";
import StockListItem from '@/src/components/StockListItem';

function getStocks(): Effect.Effect<any, Error> {
  return Effect.try({
    try: () => Object.values(top5),
    catch: (unknwon) => new Error("Cannot convert test file to stocks object")
  });
}

export default function TabOneScreen() {
  const stocks: any = Effect.runSync(getStocks())

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Stocks" }} />

      <FlatList
        data={stocks}
        renderItem={(({ item }) => <StockListItem stock={item} />)}
        contentContainerStyle={{ gap: 20, padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
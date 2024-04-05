import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";
import Stock from "@/src/model/stock";
import Colors from "@/src/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { MonoText } from "./StyledText";
import { Console, Effect, pipe } from "effect";

type StockListItem = {
    stock: Stock
}

function toFixed(close: string): string {
    return pipe(Effect.try({
        try: () => Number.parseFloat(close.toString()).toFixed(1),
        catch: (unknwon) => new Error(`Cannot get the fixed number of close, which is ${close}`)
    }), Effect.runSync);
}

function percentChangeColor(percentChange: string): string {
    return pipe(Effect.try({
        try: () => Number.parseFloat(percentChange),
        catch: (err) => new Error(`Cannot get the fixed number of close, which is ${close}\n${err}`)
    }), Effect.map((percentChange: number) => {
        return percentChange > 0 ? "red" : "green"
    }), Effect.runSync);
}

function percentChangePrefix(percentChange: string): string {
    return pipe(Effect.try({
        try: () => Number.parseFloat(percentChange),
        catch: (err) => new Error(`Cannot get the fixed number of close, which is ${close}\n${err}`)
    }), Effect.map((percentChange: number) => {
        return percentChange > 0 ? "+" : ""
    }), Effect.runSync);
}

export default function StockListItem({ stock }: StockListItem): React.JSX.Element {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.symbol}>
                    {stock.symbol}
                    <AntDesign name="staro" size={18} color={"grey"} />
                </Text>
                <Text style={styles.name}> {stock.name} </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
                <MonoText style={{}}> {toFixed(stock.close)} </MonoText>
                <MonoText style={{ color: percentChangeColor(stock.percent_change) }}>
                    {percentChangePrefix(stock.percent_change)}
                    {toFixed(stock.percent_change)}%
                </MonoText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    symbol: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.light.tint
    },
    name: {
        color: "grey"
    }
})
import * as ReactNavigationNative from "@react-navigation/native";
import * as ReactNativeSkia from "@shopify/react-native-skia";
import * as VictoryNative from "victory-native";
import * as ReactNativeReanimated from "react-native-reanimated";
import * as ReactQuery from "@tanstack/react-query";
import * as CryptoAPI from "@/api/crypto";
import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { View, Text } from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { price } from "@/utils/price";

interface CoinHistory {
  data: {
    data: {
      history: Array<{
        price: string;
        timestamp: number;
      }>;
    };
  };
}

interface Coin {
  data: {
    data: {
      coin: {
        symbol: string;
      };
    };
  };
}

const CoinDetailsScreen = () => {
  const [lineData, setLineData] = React.useState<any>([]);
  const [item, setItem] = React.useState<any>({});
  const navigate: ReactNavigationNative.NavigationProp<ScreenNavigationType> =
    ReactNavigationNative.useNavigation();

  const {
    params: { coinUuid },
  } = ReactNavigationNative.useRoute();

  const font = ReactNativeSkia.useFont(
    require("../../../assets/fonts/MiSans_Semibold.ttf"),
    12
  );

  const { state, isActive } = VictoryNative.useChartPressState({
    x: 0,
    y: { price: 0 },
  });

  const Tooltip = ({
    x,
    y,
  }: {
    x: ReactNativeReanimated.SharedValue<number>;
    y: ReactNativeReanimated.SharedValue<number>;
  }) => <ReactNativeSkia.Circle cx={x} cy={y} r={0} color="red" />;

  const { data: coinDetails, isLoading: isCoinDetailsLoading } =
    ReactQuery.useQuery({
      queryKey: ["data", coinUuid],
      queryFn: () => CryptoAPI.fetchCoinDetails(coinUuid),
    });

  const { data: coinHistory, isLoading: isCoinHisotryLoading } =
    ReactQuery.useQuery({
      queryKey: [],
      queryFn: () => CryptoAPI.fetchCoinHistory(coinUuid),
    });

  React.useEffect(() => {
    if (coinHistory && (coinHistory as CoinHistory).data.data.history) {
      setLineData(
        (coinHistory as CoinHistory).data.data.history.map(
          (item: { price: string; timestamp: number }) => {
            return {
              price: parseFloat(item.price),
              timestamp: item.timestamp,
            };
          }
        )
      );
    }

    if (coinDetails && (coinDetails as Coin).data.data.coin)
      setItem((coinDetails as Coin).data.data.coin);
  }, [coinDetails, coinHistory]);

  return (
    <SafeAreaView className="flex-1 mt-1">
      {isCoinDetailsLoading || isCoinHisotryLoading ? (
        <View className="absolute z-50 h-full w-full justify-center items-center">
          <View className="h-full w-full justify-center items-center opacity-[0.45]"></View>
          <View className="absolute">
            <ActivityIndicator size="large" color="black" />
          </View>
        </View>
      ) : (
        <View>
          <View className="flex-row items-center justify-between px-4">
            <Pressable
              className="border-2 border-neutral-500 rounded-full p-1"
              onPress={() => navigate.goBack()}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="gray"
              />
            </Pressable>

            <View>
              <Text className="font-bold text-lg">{item.symbol}</Text>
            </View>

            <View className="border-2 border-neutral-500 rounded-full p-1">
              <Entypo name="dots-three-horizontal" size={24} color="gray" />
            </View>
          </View>

          <View className="px-4 py-2 mt-4 ml-1 mr-1 justify-center items-center bg-teal-800 rounded-lg overflow-hidden">
            <Text
              className="text-2xl text-white"
              style={{ fontFamily: "FrankMono" }}
            >
              {price(item?.price)}
            </Text>
          </View>

          {item && (
            <View className="flex-row justify-center items-center space-x-2 px-4 py-2">
              <View className="flex-row w-full py-4 pl-2 pr-2 mb-4 mt-4 items-center bg-slate-200 rounded-3xl overflow-hidden">
                <View className="w-[16%]">
                  <View className="h-10 w-10">
                    <Image
                      className="w-full h-full flex-1"
                      source={{ uri: item.iconUrl }}
                      placeholder="alksdjfjoi_)(*&^%$"
                      contentFit="cover"
                      transition={1000}
                    />
                  </View>
                </View>

                <View className="w-[55%] justify-start items-start">
                  <Text className="text-lg" style={{ fontFamily: "MiSans" }}>
                    {item.name}
                  </Text>

                  <View className="flex-row justify-center items-center space-x-2">
                    <Text
                      className="text-sm text-neutral-500"
                      style={{ fontFamily: "FrankMono" }}
                    >
                      {price(item?.price)}
                    </Text>

                    <Text
                      className={`text-sm ${
                        item.change < 0
                          ? "text-red-600"
                          : item.change > 0
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                      style={{ fontFamily: "FrankMono" }}
                    >
                      {item.change}%
                    </Text>
                  </View>
                </View>

                <View className="w-[29%] justify-start items-end">
                  <Text className="font-bold text-base">{item.symbol}</Text>
                  <View className="flex-row justify-center items-center space-x-2">
                    <Text
                      className="font-medium text-sm text-neutral-500"
                      style={{
                        fontFamily: "FrankMono",
                      }}
                    >
                      {item?.marketCap?.length > 9
                        ? item.marketCap.slice(0, 9)
                        : item.marketCap}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      )}

      <View className="h-[50%] w-[full] mr-1 ml-1">
        <View className="w-full h-full">
          {lineData.length != 0 && (
            <VictoryNative.CartesianChart
              chartPressState={state}
              axisOptions={{
                font,
                tickCount: 0,
                labelOffset: { x: -1, y: 0 },
                labelColor: "#434c5e",
                formatXLabel: (ms) => new Date(ms * 1000).toLocaleDateString(),
              }}
              data={lineData}
              xKey="timestamp"
              yKeys={["price"]}
            >
              {({ points }: { points: any }) => (
                <>
                  <VictoryNative.Line
                    points={points.price}
                    color="green"
                    strokeWidth={2}
                  />

                  {isActive && (
                    <Tooltip x={state.x.position} y={state.y.price.position} />
                  )}
                </>
              )}
            </VictoryNative.CartesianChart>
          )}
        </View>
      </View>

      <View className="px-4 py-4 bg-blue-200 bg-bl ml-2 mr-2 rounded-lg mt-4 overflow-hidden">
        <View className="flex-row justify-between">
          <Text className="text-base" style={{ fontFamily: "MiSans" }}>
            历史新高
          </Text>

          <Text
            className="font-medium text-sm text-blue-800"
            style={{ fontFamily: "FrankMono" }}
          >
            {price(item?.allTimeHigh?.price)}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-base" style={{ fontFamily: "MiSans" }}>
            市场数量
          </Text>

          <Text
            className="font-medium text-sm text-blue-800"
            style={{ fontFamily: "FrankMono" }}
          >
            {price(item?.numberOfMarkets)}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-base" style={{ fontFamily: "MiSans" }}>
            交易次数
          </Text>

          <Text
            className="font-medium text-sm text-blue-800"
            style={{ fontFamily: "FrankMono" }}
          >
            {price(item?.numberOfExchanges)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CoinDetailsScreen;

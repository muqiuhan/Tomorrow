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

interface CoinHistoryLineData {
  price: number;
  timestamp: number;
}

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
  const [lineData, setLineData] = React.useState<
    CoinHistoryLineData[] | void[]
  >([]);

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

  const tooltip = ({
    x,
    y,
  }: {
    x: ReactNativeReanimated.SharedValue<number>;
    y: ReactNativeReanimated.SharedValue<number>;
  }) => {
    return <ReactNativeSkia.Circle cx={x} cy={y} r={0} color="red" />;
  };

  const { data: coinDetails, isLoading: isCoinDetailsLoading } =
    ReactQuery.useQuery({
      queryKey: ["data", coinUuid],
      queryFn: coinUuid ? () => CryptoAPI.fetchCoinDetails(coinUuid) : coinUuid,
    });

  const { data: coinHistory, isLoading: isCoinHisotryLoading } =
    ReactQuery.useQuery({
      queryKey: [],
      queryFn: coinUuid ? () => CryptoAPI.fetchCoinHistory(coinUuid) : coinUuid,
    });

  React.useEffect(() => {
    if (coinHistory && (coinHistory as CoinHistory).data.data.history) {
      setLineData(
        (coinHistory as CoinHistory).data.data.history.map(
          (item: { price: string; timestamp: number }) => {
            price: parseFloat(item.price);
            timestamp: item.timestamp;
          }
        )
      );
    }

    if (coinDetails && (coinDetails as Coin).data.data.coin)
      setItem((coinDetails as Coin).data.data.coin);
  }, [coinDetails, coinHistory]);

  return (
    <SafeAreaView className="flex-1">
      {isCoinDetailsLoading || isCoinHisotryLoading ? (
        <View className="absolute z-50 h-full w-full justify-center items-center">
          <View className="h-full w-full justify-center items-center opacity-[0.45]"></View>
          <View className="absolute">
            <ActivityIndicator size="large" color="white" />
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
        </View>
      )}
    </SafeAreaView>
  );
};

export default CoinDetailsScreen;

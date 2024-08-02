import Avatar from "@/app/components/Avatar";
import React from "react";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import Animated, * as ReactNativeReanimated from "react-native-reanimated";
import * as ReactNavigationNative from "@react-navigation/native";
import * as ReactQuery from "@tanstack/react-query";
import * as CryptoAPI from "@/api/crypto";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "@/store/useUserStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { FlatList, ScrollView } from "react-native-gesture-handler";

interface Coin {
  uuid: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: string;
  change: number;
  marketCap: string;
}

interface Coins {
  data: {
    data: {
      coins: Array<Coin>;
    };
  };
}

const HomeScreen = () => {
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { getUserProfile } = useSupabaseAuth();
  const { session } = useUserStore();

  const handleGetProfile = async () => {
    setLoading(true);

    try {
      const { data, error, status } = await getUserProfile();
      if (error && status !== 406) {
        setLoading(false);
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      Alert.alert(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  ReactNavigationNative.useFocusEffect(
    React.useCallback(() => {
      if (session) handleGetProfile();
    }, [session])
  );

  const { data: coinsData, isLoading: isAllCoinsLoading } = ReactQuery.useQuery(
    {
      queryKey: ["data", "coins"],
      queryFn: CryptoAPI.fetchAllCoin,
    }
  );

  const renderCoins = ({ item, index }: { item: Coin; index: number }) => {
    return (
      <Pressable className="flex-row w-full py-3 items-center">
        <Animated.View
          className="w-full flex-row justify-center items-center"
          entering={ReactNativeReanimated.FadeInDown.duration(100)
            .delay(index * 200)
            .springify()}
        >
          <View className="w-[15%]">
            <View>
              <View className="w-10 h-10">
                <Image
                  className="w-full h-full flex-1"
                  source={{ uri: item.iconUrl }}
                  placeholder="laskdjflajsdlf"
                  contentFit="cover"
                  transition={1000}
                />
              </View>
            </View>
          </View>

          <View className="w-[50%] justify-start items-start">
            <Text
              className="font-bold text-lg underline"
              style={{ fontFamily: "MiSans" }}
            >
              {item.name}
            </Text>

            <View className="flex-row justify-center items-center space-x-2">
              <Text
                className="font-medium text-sm text-blue-800"
                style={{ fontFamily: "FrankMono" }}
              >
                {`$ ${parseFloat(item?.price)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
              </Text>

              <Text
                className={`font-medium text-sm ${
                  item.change < 0
                    ? "text-red-600"
                    : item.change > 0
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
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
                {item.marketCap.length > 9
                  ? item.marketCap.slice(0, 9)
                  : item.marketCap}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row justify-between items-center px-4 py-4">
        <View className="w-3/4 flex-row space-x-3">
          <View className="justify-center items-center">
            <View className="h-12 w-12 rounded-2xl overflow-hidden">
              <Avatar url={avatarUrl} size={50} />
            </View>
          </View>
          <View>
            <Text
              className="text-lg font-bold"
              style={{ fontFamily: "MiSans" }}
            >
              你好，{username ? username : "匿名用户"}
            </Text>

            <Text
              className="text-sm text-neutral-500"
              style={{ fontFamily: "MiSans" }}
            >
              狠狠赚它一笔
            </Text>
          </View>
        </View>

        <View className="py-6">
          <View className="bg-neutral-700 rounded-lg p-1">
            <Ionicons name="menu" size={24} color="white" />
          </View>
        </View>
      </View>

      <View className="mx-4 bg-neutral-800 rounded-3xl overflow-hidden mt-4 mb-4">
        <View className="bg-orange-400 justify-center items-center py-6 rounded-3xl">
          <Text
            className="text-sm font-medium text-neutral-700 mb-1"
            style={{
              fontFamily: "MiSans",
            }}
          >
            总金额
          </Text>

          <Text
            className="text-3xl font-extrabold text-black mt-1"
            style={{
              fontFamily: "FrankMono",
            }}
          >
            ￥20,171.00
          </Text>
        </View>

        <View className="justify-between items-center flex-row py-4">
          <View className="w-1/4 justify-center items-center space-y-2">
            <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
              <Image
                className="w-full h-full flex-1"
                source={require("../../../../assets/images/money-send.png")}
                placeholder={"L8Jk.V|%06Nq8v[ec8E06JrKE0IU"}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <Text className="text-white" style={{ fontFamily: "MiSans" }}>
              转账
            </Text>
          </View>

          <View className="w-1/4 justify-center items-center space-y-2">
            <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
              <Image
                className="w-full h-full flex-1"
                source={require("../../../../assets/images/money-receive.png")}
                placeholder={"L8Jk.V|%06Nq8v[ec8E06JrKE0IU"}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <Text className="text-white" style={{ fontFamily: "MiSans" }}>
              收款
            </Text>
          </View>

          <View className="w-1/4 justify-center items-center space-y-2">
            <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
              <Image
                className="w-full h-full flex-1"
                source={require("../../../../assets/images/card-add.png")}
                placeholder={"L8Jk.V|%06Nq8v[ec8E06JrKE0IU"}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <Text className="text-white" style={{ fontFamily: "MiSans" }}>
              提现
            </Text>
          </View>

          <View className="w-1/4 justify-center items-center space-y-2">
            <View className="w-10 h-10 overflow-hidden bg-[#3B363F] rounded-full p-2">
              <Image
                className="w-full h-full flex-1"
                source={require("../../../../assets/images/more.png")}
                placeholder={"L8Jk.V|%06Nq8v[ec8E06JrKE0IU"}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <Text className="text-white" style={{ fontFamily: "MiSans" }}>
              更多
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
      >
        {isAllCoinsLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={(coinsData as Coins).data.data.coins}
            keyExtractor={(item) => item.uuid}
            renderItem={renderCoins}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

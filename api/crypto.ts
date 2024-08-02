import axios from "axios";
import { Alert } from "react-native";

const apiCall = async (endpoints: string, params: any) => {
  try {
    return await axios.request({
      method: "GET",
      url: endpoints,
      params: params ? params : {},
      headers: {
        "x-access-token":
          "coinrankingc3b21905c51e53ec8f218f667fe15bf580a04eba2c975843",
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
    return {};
  }
};

export const fetchAllCoin = async () =>
  await apiCall("https://api.coinranking.com/v2/coins", {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
    tiers: "1",
    orderBy: "marketCap",
    orderDirection: "desc",
    limit: "50",
    offset: "0",
  });

export const fetchCoinDetails = async (coinUuid: string) =>
  await apiCall(`https://api.coinranking.com/v2/coin/${coinUuid}/`, {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
  });

export const fetchCoinHistory = async (coinUuid: string) =>
  await apiCall(`https://api.coinranking.com/v2/coin/${coinUuid}/history`, {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
  });
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useUserStore } from "./store/useUserStore";
import React from "react";
import styled from "styled-components/native";
import RootNavigation from "./app/screens/navigation/RootNavigation";
import useCachedResources from "./hooks/useCachedResources";
import * as ReactQuery from "@tanstack/react-query";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const { session, user } = useUserStore();

  React.useEffect(() => console.log(user, session), [user, session]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <ReactQuery.QueryClientProvider client={new ReactQuery.QueryClient()}>
        <RootNavigation />
      </ReactQuery.QueryClientProvider>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
`;

export default App;

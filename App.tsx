import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import styled from "styled-components/native";
import RootNavigation from "./app/screens/navigation/RootNavigation";
import useCachedResources from "./hooks/useCachedResources";

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <RootNavigation />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
`;

export default App;

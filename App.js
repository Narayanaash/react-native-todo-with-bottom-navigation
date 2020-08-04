import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Header from "./components/Header";
import { Theme } from "./components/Theme";
import Main from "./components/Main";

export default function App() {
  return (
    <PaperProvider theme={Theme}>
      <Header />
      <Main />
    </PaperProvider>
  );
}

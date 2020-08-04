import React from "react";
import { Appbar } from "react-native-paper";

const Header = () => (
  <Appbar style={{ paddingTop: 20, height: 70 }}>
    <Appbar.Content title="TODO-APP" />
  </Appbar>
);

export default Header;

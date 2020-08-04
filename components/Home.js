import React from "react";
import { View, ScrollView } from "react-native";

import Form from "./Form";
import ItemList from "./ItemList";

const Home = ({ handleSubmit, items, removeItem, doneItem }) => {
  return (
    <View style={{ margin: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form handleSubmit={handleSubmit} />
        <ItemList items={items} removeItem={removeItem} doneItem={doneItem} />
      </ScrollView>
    </View>
  );
};

export default Home;

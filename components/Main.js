import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { BottomNavigation } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import ItemList from "./ItemList";
import Home from "./Home";

const Main = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (value) => {
    try {
      const items = JSON.stringify(value);
      await AsyncStorage.setItem("@items", items);
    } catch (e) {
      console.log("Error in storing data:", e);
    }
  };

  const doneItem = (id) => {
    items.find((item) => item.id === id).isCompleted = true;
    storeData(items);
    getData();
  };

  const removeItem = (id) => {
    let newItems = items.filter((item) => item.id !== id);

    setItems(newItems);
    storeData(newItems);
  };

  const handleSubmit = async (item, cb) => {
    const newItems = [
      ...items,
      { id: uuid(), item: item, isCompleted: false, date: new Date() },
    ];
    setItems(newItems);
    await storeData(newItems);
    cb();
  };

  const activeItems = [...items].filter((item) => item.isCompleted === false);
  const completedItems = [...items].filter((item) => item.isCompleted === true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@items");
      const response =
        jsonValue && jsonValue.length > 0 && jsonValue !== null
          ? JSON.parse(jsonValue)
          : [];
      setItems(response);
    } catch (e) {
      alert("Error in getting data");
      //console.log("Error in getting data:", e);
    }
  };

  const HomeRoute = () => (
    <Home
      handleSubmit={handleSubmit}
      items={items}
      removeItem={removeItem}
      doneItem={doneItem}
    />
  );
  const AllItemRoute = () => (
    <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
      <ItemList
        handleSubmit={handleSubmit}
        items={items}
        removeItem={removeItem}
        doneItem={doneItem}
      />
    </ScrollView>
  );
  const ActiveItemRoute = () => (
    <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
      <ItemList
        active="active"
        handleSubmit={handleSubmit}
        items={activeItems}
        removeItem={removeItem}
        doneItem={doneItem}
      />
    </ScrollView>
  );
  const CompletedItemRoute = () => (
    <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
      <ItemList
        active="completed"
        handleSubmit={handleSubmit}
        items={completedItems}
        removeItem={removeItem}
        doneItem={doneItem}
      />
    </ScrollView>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Home", icon: "home" },
    { key: "all", title: "All", icon: "view-list" },
    {
      key: "active",
      title: "Incomplete",
      icon: "image-filter-center-focus-strong",
    },
    { key: "complete", title: "Completed", icon: "checkbox-marked" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    all: AllItemRoute,
    active: ActiveItemRoute,
    complete: CompletedItemRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Main;

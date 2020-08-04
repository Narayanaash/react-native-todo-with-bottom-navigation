import React, { useState } from "react";
import { List } from "react-native-paper";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const ItemList = ({ items, removeItem, doneItem, active }) => {
  return (
    <List.Section>
      <List.Subheader style={{ marginTop: 15 }}>
        {items.length > 0 ? (
          active === "active" ? (
            <Text>Your incompleted items</Text>
          ) : active === "completed" ? (
            <Text>Your completed items</Text>
          ) : (
            <Text>Your List of Items:</Text>
          )
        ) : null}
      </List.Subheader>
      {items
        .slice(0)
        .reverse()
        .map(({ item, id, isCompleted }) => (
          <GestureRecognizer
            key={id}
            onSwipeRight={() => removeItem(id)}
            onSwipeLeft={() => doneItem(id)}
            on
            config={config}
            style={{
              flex: 1,
            }}
          >
            <List.Item
              title={item}
              right={() => (
                <>
                  {isCompleted ? (
                    <TouchableOpacity>
                      <List.Icon
                        color="#00ab13"
                        icon="checkbox-marked-circle"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => doneItem(id)}>
                      <List.Icon
                        color="#e3d405"
                        icon="checkbox-marked-circle"
                      />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity onPress={() => removeItem(id)}>
                    <List.Icon color="red" icon="delete" />
                  </TouchableOpacity>
                </>
              )}
              style={[
                styles.styleList,
                isCompleted ? styles.listOpacity : null,
              ]}
            />
          </GestureRecognizer>
        ))}
    </List.Section>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  styleList: {
    padding: 0,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#eee",
    marginBottom: 8,
    backgroundColor: "#baf4ff",
  },
  listOpacity: {
    opacity: 0.5,
  },
});

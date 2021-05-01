import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function Bar(props) {
  return (
    <View style={styles.viewBody}>
      <Text>Beers</Text>
    </View>
  );
}

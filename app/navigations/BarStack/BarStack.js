import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import Bars from "../../screens/Bars/Bars/Bars";
import Bar from "../../screens/Bars/Bar/Bar";
import AddBar from "../../screens/Bars/AddBar/AddBar";
import AddReviewRestaurant from "../../screens/Bars/AddReviewRestaurant/AddReviewRestaurant";

const Stack = createStackNavigator();

export default function BarStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="bar"
        component={Bars}
        options={{
          title: "Bares de España",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            fontFamily: "sweet",
            fontSize: 30,
            alignSelf: "center",
            justifyContent: "center",
          },
          headerLeft: () => (
            <Icon
              type="material-community"
              name="menu"
              iconStyle={styles.iconHeaderLeft}
            />
          ),
          headerRight: () => (
            <Icon
              type="material-community"
              name="magnify"
              iconStyle={styles.iconHeaderRight}
              onPress={() => navigation.navigate("search")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="add-bar"
        component={AddBar}
        options={{
          title: "Añadir un nuevo Bar",
          headerStyle: {
            backgroundColor: "#f2B705",
          },
        }}
      />
      <Stack.Screen name="restaurant" component={Bar} />
      <Stack.Screen
        name="add-review-restaurant"
        component={AddReviewRestaurant}
        options={{ title: "Nuevo comentario" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconHeaderLeft: { marginLeft: 12 },
  iconHeaderRight: { marginRight: 12 },
});

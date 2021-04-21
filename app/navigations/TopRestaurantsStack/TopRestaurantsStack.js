import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopRestaurants from "../../screens/TopRestaurants/TopRestaurants";

const Stack = createStackNavigator();

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top-restaurants"
        component={TopRestaurants}
        options={{
          title: "Top Bares",
          headerStyle: {
            backgroundColor: "#f2B705",
          },
        }}
      />
    </Stack.Navigator>
  );
}

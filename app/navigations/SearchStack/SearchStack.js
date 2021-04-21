import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../../screens/Search/Search";

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: "Search",
          headerStyle: {
            backgroundColor: "#f2B705",
          },
        }}
      />
    </Stack.Navigator>
  );
}

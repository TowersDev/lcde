import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home/Home";
import BarHome from "../../screens/Home/BarHome/BarHome";

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="home"
        component={Home}
        options={{
          //title: "HOME",
          // headerStyle: {
          //   backgroundColor: "transparent",
          // },
          headerShown: false
        }}
      />
            <Stack.Screen name="barHome" component={BarHome} />
    </Stack.Navigator>
  );
}

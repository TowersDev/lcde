import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../../screens/Favorites/Favorites";

const Stack = createStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favourites"a
        component={Favorites}
        options={{
          title: "Bares favoritos",
          headerStyle: {
            backgroundColor: "#f2B705",
          },
        }}
      />
    </Stack.Navigator>
  );
}

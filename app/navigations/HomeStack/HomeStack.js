import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home/Home";
import BarHome from "../../screens/Home/BarHome/BarHome";
import AddReviewRestaurant from "../../screens/Bars/AddReviewRestaurant/AddReviewRestaurant";

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: "Localiza el bar",
          headerStyle: {
            backgroundColor: "#f2B705",
          },
        }}
      />
        <Stack.Screen
          name="add-review-restaurant"
          component={AddReviewRestaurant}
          options={{ title: "Nuevo comentario" }}
        />
            <Stack.Screen name="barHome" component={BarHome} />
    </Stack.Navigator>
  );
}

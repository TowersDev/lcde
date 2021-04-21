import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import HomeStack from "./HomeStack/HomeStack";
import BarStack from "./BarStack/BarStack";
import FavoritesStack from "./FavoritesStack/FavoritesStack";
import AccountStack from "./AccountStack/AccountStack";
import SearchStack from "./SearchStack/SearchStack";
import TopRestaurantsStack from "./TopRestaurantsStack/TopRestaurantsStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home"
        tabBarOptions={{
          inactiveTintColor: "#fff",
          activeTintColor: "#A62F03",
          showLabel: false,
          style: {
            backgroundColor: "#F2B705",
          },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen name="home" component={HomeStack} />
        <Tab.Screen name="bar" component={BarStack} />
        <Tab.Screen name="favorites" component={FavoritesStack} />
        <Tab.Screen name="top-cervezas" component={TopRestaurantsStack} />
        <Tab.Screen name="search" component={SearchStack} />
        <Tab.Screen name="account" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "home":
      iconName = "home";
      break;
    case "bar":
      iconName = "beer";
      break;
    case "favorites":
      iconName = "heart-outline";
      break;
    case "top-cervezas":
      iconName = "star-outline";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "account";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}

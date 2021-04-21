import React, { useEffect, useState } from "react";
import { YellowBox, View } from "react-native";
import { firebaseApp } from "./app/utils/firebase";
import Navigation from "./app/navigations/Navigation";
import * as Font from "expo-font";
import { decode, encode } from "base-64";

YellowBox.ignoreWarnings(["Setting a timer"]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  });

  const loadFonts = async () => {
    await Font.loadAsync({
      sweet: require("./assets/fonts/sweet.ttf"),
    });

    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return <View />;
  }

  return <Navigation />;
}

import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";
import Account from "../../screens/Account/Account";
import Login from "../../screens/Account/Login/Login";
import ProfileAccount from "../../screens/Account/ProfileAccount/ProfileAccount";
import Register from "../../screens/Account/Resgister/Register";

const Stack = createStackNavigator();

export default function AccountStack({ navigation }) {
  const [user, setUser] = useState(null);
  const [realoadUserInfo, setRealoadUserInfo] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
    setRealoadUserInfo(false)
  }, [realoadUserInfo]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          title: "Mi Cuenta",
          headerStyle: {
            backgroundColor: "#f2B705",
          },
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: "Iniciar sesión",
          headerStyle: {
            backgroundColor: "#f2B705",
          },
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          title: "Registro",
          headerStyle: {
            backgroundColor: "#f2B705",
          },
        }}
      />
      <Stack.Screen name="profileAccount" component={ProfileAccount} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconHeaderRight: { marginRight: 12 },
});

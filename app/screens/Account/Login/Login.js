import React, { useRef } from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../../components/Account/LoginForm/LoginForm";
import LoginFacebook from "../../../components/Account/LoginFacebook/LoginFacebook";
import styles from "./styles";

export default function Login() {
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      {/* <Divider style={styles.divider} /> */}
      {/* <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} />
      </View> */}
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function CreateAccount(props) {
  const navigation = useNavigation();

  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Registrarse
      </Text>
    </Text>
  );
}

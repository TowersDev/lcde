import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import AccountOptions from "../../../components/Account/AccountOptions/AccountOptions";

export default function ProfileAccount(props) {
    const { navigation, route } = props;
    const [userInfo, setUserInfo] = useState(null);
    const [realoadUserInfo, setRealoadUserInfo] = useState(false);
    const toastRef = useRef();

    useEffect(() => {
        (async () => {
          const user = await firebase.auth().currentUser;
          setUserInfo(user);
        })();
        setRealoadUserInfo(false);
    }, [realoadUserInfo]);

    const logout = () => {
        firebase.auth().signOut();
        navigation.navigate("account");
      };

    return (
        <View style={styles.viewUserInfo}>
            {userInfo && (
                <AccountOptions
                    userInfo={userInfo}
                    toastRef={toastRef}
                    setRealoadUserInfo={route.params.params}
                    navigation={navigation}
                />
            )}
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={() => logout()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
        marginTop: 30,
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10,
    },
    btnCloseSessionText: {
        color: "#A62F03",
    },
});


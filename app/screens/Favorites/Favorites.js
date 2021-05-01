import React, { useState, useRef, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert, Dimensions } from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading/Loading";
import styles from "./styles";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
  const { navigation } = props;
  const [bars, setBars] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
        const idUser = firebase.auth().currentUser.uid;
        db.collection("favorites")
          .where("idUser", "==", idUser)
          .get()
          .then((response) => {
            const idBarsArray = [];
            response.forEach((doc) => {
              console.log(doc.data())
              idBarsArray.push(doc.data());
            });
            setBars(idBarsArray);
          });
      }
      setReloadData(false);
    }, [userLogged, reloadData])
  );

  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
  }

  if (bars?.length === 0) {
    return <NotFoundRestaurants />;
  }

  return (
    <View style={styles.viewBody}>
      {bars ? (
        <FlatList
          data={bars}
          renderItem={(bar) => (
            <Bar
              bar={bar}
              setIsLoading={setIsLoading}
              toastRef={toastRef}
              setReloadData={setReloadData}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
          <Text style={{ textAlign: "center" }}>Cargando bares</Text>
        </View>
      )}
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text="Eliinando bar" isVisible={isLoading} />
    </View>
  );
}

function NotFoundRestaurants() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        No tienes bares en tu lista
      </Text>
    </View>
  );
}

function UserNoLogged(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Necesitas estar logeado para ver esta sección
      </Text>
      <Button
        title="Ir al login"
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#00a680" }}
        onPress={() => navigation.navigate("account", { screen: "login" })}
      />
    </View>
  );
}

function Bar(props) {
  const screenWidth = Dimensions.get("window").width;
  const {
    bar,
    setIsLoading,
    toastRef,
    setReloadData,
    navigation,
  } = props;
  const { idBar, idUser, address, location, nombre, photos,  } = bar.item;
  console.log(bar)

  const confirmRemoveFavorite = () => {
    Alert.alert(
      "Eliminar bar de Favoritos",
      "¿Estas seguro de que quieres eliminar el bar de favoritos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: removeFavorite,
        },
      ],
      { cancelable: false }
    );
  };

  const removeFavorite = () => {
    setIsLoading(true);
    db.collection("favorites")
      .where("idBar", "==", idBar)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              toastRef.current.show("bar eliminado correctamente");
            })
            .catch(() => {
              setIsLoading(false);
              toastRef.current.show("Error al eliminar el bar");
            });
        });
      });
  };

  return (
    <View style={styles.restaurant}>
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate("bar", {
        //     screen: "restaurant",
        //     params: { id },
        //   })
        // }
      >{photos ? photos.map((pic, index) => (
          <Image
            key={idBar}
            style={{ width: screenWidth - 20, height: 250 }}
            resizeMode="cover"
            source={{ uri: pic.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${pic.photo_reference}&key=AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo` : '../../../assets/img/no-image.png' }}
          />
        )) : (
        <Image
            key={idBar}
            style={{ width: screenWidth - 20, height: 250 }}
            resizeMode="cover"
            source={require("../../../assets/img/no-image.png")}
          />
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{nombre}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            containerStyle={styles.favorite}
            onPress={confirmRemoveFavorite}
            underlayColor="transparent"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

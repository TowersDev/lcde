import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  RefreshControl,
  FlatList,
} from "react-native";
import { Rating, ListItem, Icon, Image, Avatar } from "react-native-elements";
import { map } from "lodash";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import Loading from "../../../components/Loading/Loading";
import Carousel from "../../../components/Carousel";
import Map from "../../../components/Map";
import ListReviews from "../../../components/Bars/ListReviews/ListReviews";

import { firebaseApp } from "../../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import styles from "./styles";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Bar(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();
  const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = React.useCallback(async () => {
  //   setRefreshing(true);
  // };

  navigation.setOptions({ title: name });

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      db.collection("bars")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setRestaurant(data);
          setRating(data.rating);
        });
    }, [])
  );

  useEffect(() => {
    if (userLogged && restaurant) {
      db.collection("favorites")
        .where("idRestaurant", "==", restaurant.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
          if (response.docs.length === 1) {
            setIsFavorite(true);
          }
        });
    }
  }, [userLogged, restaurant]);

  const addFavorite = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Para usar el sistema de favoritos tienes que estar logeado"
      );
    } else {
      const payload = {
        idUser: firebase.auth().currentUser.uid,
        idRestaurant: restaurant.id,
      };
      db.collection("favorites")
        .add(payload)
        .then(() => {
          setIsFavorite(true);
          toastRef.current.show("bar añadido a favoritos");
        })
        .catch(() => {
          toastRef.current.show("Error al añadir el bar a favoritos");
        });
    }
  };

  const removeFavorite = () => {
    db.collection("favorites")
      .where("idRestaurant", "==", restaurant.id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsFavorite(false);
              toastRef.current.show("bar eliminado de favoritos");
            })
            .catch(() => {
              toastRef.current.show("Error al eliminar el bar de favoritos");
            });
        });
      });
  };

  if (!restaurant) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView
      vertical
      style={styles.viewBody}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
    >
      <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          underlayColor="transparent"
        />
      </View>
      <Carousel
        arrayImages={restaurant.images}
        height={250}
        width={screenWidth}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={rating}
      />
      <RestaurantInfo
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
      <ListReviews navigation={navigation} idRestaurant={restaurant.id} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function TitleRestaurant(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

function RestaurantInfo(props) {
  const { location, name, address } = props;
  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
  ];

  const list = [
    {
      name: 'Cruz Campo',
      avatar_url: require("../../../../assets/img/cruzcampo.png"),
      categoría: 'cerveza',
      grados: 0,
    },
    {
      name: 'Cruz Campo',
      avatar_url: require("../../../../assets/img/cruzcampo.png"),
      categoría: 'cerveza',
      grados: 0,
    },
    {
      name: 'Cruz Campo',
      avatar_url: require("../../../../assets/img/cruzcampo.png"),
      subtitle: 'cerveza',
      grados: 0,
    },
    {
      name: 'Cruz Campo',
      avatar_url: require("../../../../assets/img/cruzcampo.png"),
      categoría: 'cerveza',
      grados: 0,
    },
  ]

  return (
    <View style={styles.viewRestaurantInfo} pointerEvents="none">
      <Text style={styles.restaurantInfoTitle}>Información sobre el bar</Text>
      <Map location={location} name={name} height={100} />
      <View>
        <View>
          {map(listInfo, (item, index) => (
            <ListItem
              key={index}
              title={item.text}
              leftIcon={{
                name: item.iconName,
                type: item.iconType,
                color: "#00a680",
              }}
              containerStyle={styles.containerListItem}
            />
          ))}
        </View>
        <Text style={{ marginTop: 10, marginBottom: 10}}>Cervezas: </Text>
        <View style={{ height: 300 }}>
          {map(list, (item, index) => (
              <FlatList
              data={list}
              key={index}
              renderItem={({item}) => (
                <>
                  <View style={{ flexDirection: "row", height: "100%" }}>
                    <Image
                      source={item.avatar_url}
                      resizeMode="contain"
                      style={styles.imageCerveza}
                    />
                    <View>
                      <Text style={styles.item}>{item.name}</Text>
                      <Text style={styles.item}>{item.categoría}</Text>
                      <Text style={styles.item}>Grados: {item.grados}</Text>
                    </View>
                  </View>
                </>
              )}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

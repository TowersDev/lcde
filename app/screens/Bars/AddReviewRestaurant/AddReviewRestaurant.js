import React, { useState, useRef } from "react";
import { Text, View } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../../components/Loading/Loading";

import { firebaseApp } from "../../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import styles from "./styles";

const db = firebase.firestore(firebaseApp);

export default function AddReviewRestaurant(props) {
  const { navigation, route } = props;
  const { idBar } = route.params;
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  const addRevew = () => {
    if (!rating) {
      toastRef.current.show("No has dado ninguna putuacion");
    } else if (!title) {
      toastRef.current.show("El titulo es oblogatorio");
    } else if (!review) {
      toastRef.current.show("El comentatio es obligatorio");
    } else {
      setIsLoading(true);
      const user = firebase.auth().currentUser;
      const paylod = {
        idUser: user.uid,
        displayName: user.displayName,
        avatarUser: user.photoURL,
        idBar: idBar,
        title: title,
        review: review,
        rating: rating,
        createAt: new Date(),
      };

      db.collection("reviews")
        .add(paylod)
        .then(() => {
          updateRestaurant();
        })
        .catch(() => {
          toastRef.current.show("Error al enviar la review");
          setIsLoading(false);
        });
    }
  };

  const updateRestaurant = () => {
    const restaurantRef = db.collection("bars").doc(idBar);

    restaurantRef.get().then((response) => {
      const restaurantData = response.data();
      const ratingTotal = restaurantData.ratingTotal + rating;
      const quantityVoting = restaurantData.quantityVoting + 1;
      const ratingResult = ratingTotal / quantityVoting;

      restaurantRef
        .update({
          rating: ratingResult,
          ratingTotal,
          quantityVoting,
        })
        .then(() => {
          setIsLoading(false);
          navigation.navigate("bar");
        });
    });
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={["P??simo", "Deficiente", "Normal", "Muy Bueno", "Excelente"]}
          defaultRating={0}
          size={35}
          onFinishRating={(value) => {
            setRating(value);
          }}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder="Titulo"
          containerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder="Comentario..."
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setReview(e.nativeEvent.text)}
        />
        <Button
          title="Enviar Comnetario"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={addRevew}
        />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="Enviando comenario" />
    </View>
  );
}

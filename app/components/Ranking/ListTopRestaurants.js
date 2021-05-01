import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Card, Image, Icon, Rating } from "react-native-elements";
import styles from "./styles";

export default function ListTopRestaurants(props) {
  const { restaurants, navigation } = props;
  return (
    <FlatList
      data={restaurants}
      renderItem={(restaurant) => (
        <Restaurant restaurant={restaurant} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { id, name, rating, images, description, ratingTotal, quantityVoting } = restaurant.item;
  const [iconColor, setIconColor] = useState("#000");

  useEffect(() => {
    if (restaurant.index === 0) {
      setIconColor("#efb819");
    } else if (restaurant.index === 1) {
      setIconColor("#e3e4e5");
    } else if (restaurant.index === 2) {
      setIconColor("#cd7f32");
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("bar", {
          screen: "restaurant",
          params: { id },
        })
      }
    >
      <Card containerStyle={styles.containerCard}>
        <Icon
          type="material-community"
          name="chess-queen"
          color={iconColor}
          size={20}
          containerStyle={styles.containerIcon}
        />
        <Image
          style={styles.restaurantImage}
          resizeMode="cover"
          source={
            images[0]
              ? { uri: images[0] }
              : require("../../../assets/img/no-image.png")
          }
        />
        {/* <View style={styles.titleRating}>
          <Text style={styles.title}>{name}</Text>
          <Rating style={styles.rating} imageSize={20} startingValue={rating} readonly />
          <Text>{ratingTotal}</Text>
          <Text>votos: {quantityVoting}</Text>
        </View>
        <Text style={styles.description}>{description}</Text> */}

        <View style={styles.titleRating}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.rating}>
              <Rating imageSize={20} startingValue={rating} readonly />
              <Text style={styles.textRatingTotal}>{ratingTotal}</Text>
            </View>

          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

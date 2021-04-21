import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
} from "rn-placeholder";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Image, Icon, Rating } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function ListRestaurants(props) {
  const { restaurants, handleLoadMore, isLoading } = props;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  // onRefresh = () => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 1000);
  // };

  return (
    <View>
      {size(restaurants) > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        />
      ) : (
        // <View style={styles.loaderRestaurants}>
        //   <ActivityIndicator size="large" />
        //   <Text>Cargando restaurantes</Text>
        // </View>
        <>
          <Placeholder
            Animation={ShineOverlay}
            style={{
              marginVertical: 6,
              marginHorizontal: 15,
              borderRadius: 4,
            }}
            Left={(props) => (
              <PlaceholderMedia
                style={[
                  props.style,
                  {
                    width: responsiveWidth(18),
                    height: responsiveHeight(12),
                  },
                ]}
              />
            )}
          >
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine />
          </Placeholder>
          <Placeholder
            Animation={ShineOverlay}
            style={{
              marginVertical: 6,
              marginHorizontal: 15,
              borderRadius: 4,
            }}
            Left={(props) => (
              <PlaceholderMedia
                style={[
                  props.style,
                  {
                    width: responsiveWidth(18),
                    height: responsiveHeight(12),
                  },
                ]}
              />
            )}
          >
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine />
          </Placeholder>
          <Placeholder
            Animation={ShineOverlay}
            style={{
              marginVertical: 6,
              marginHorizontal: 15,
              borderRadius: 4,
            }}
            Left={(props) => (
              <PlaceholderMedia
                style={[
                  props.style,
                  {
                    width: responsiveWidth(18),
                    height: responsiveHeight(12),
                  },
                ]}
              />
            )}
          >
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine />
          </Placeholder>
          <Placeholder
            Animation={ShineOverlay}
            style={{
              marginVertical: 6,
              marginHorizontal: 15,
              borderRadius: 4,
            }}
            Left={(props) => (
              <PlaceholderMedia
                style={[
                  props.style,
                  {
                    width: responsiveWidth(18),
                    height: responsiveHeight(12),
                  },
                ]}
              />
            )}
          >
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine />
          </Placeholder>
          <Placeholder
            Animation={ShineOverlay}
            style={{
              marginVertical: 6,
              marginHorizontal: 15,
              borderRadius: 4,
            }}
            Left={(props) => (
              <PlaceholderMedia
                style={[
                  props.style,
                  {
                    width: responsiveWidth(18),
                    height: responsiveHeight(12),
                  },
                ]}
              />
            )}
          >
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine />
          </Placeholder>
        </>
      )}
    </View>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { id, images, name, address, description, rating, ratingTotal } = restaurant.item;
  const imageRestaurant = images ? images[0] : null;

  const goRestaurant = () => {
    navigation.navigate("restaurant", {
      id,
      name,
    });
  };

  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={styles.viewRestaurant}>
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="fff" />}
            source={
              imageRestaurant
                ? { uri: imageRestaurant }
                : require("../../../../assets/img/no-image.png")
            }
            style={styles.imageRestaurant}
          />
        </View>
        <View style={{ marginTop: 3}}>
          <Text style={styles.restaurantName}>{name}</Text>
          <View style={{flexDirection: "row"}}>
            <Icon type="material-community" size={13} name="map-marker" iconStyle={styles.iconMarker} underlayColor="transparent" />
            <Text style={styles.restaurantAddress}>{address}</Text>
          </View>
          <Text style={styles.restaurantDescription}>{description.substr(0, 60)}</Text>
          <View style={{flexDirection: "row"}}>
            <Rating ratingColor={"#ff0000"} style={styles.rating} imageSize={10} startingValue={rating} readonly />
            <Text style={{ fontSize: 10, marginTop: 3, fontWeight: "bold" }}>{ratingTotal}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loaderRestaurants}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundRestaurants}>
        <Text>No quedan restaurantes por cargar</Text>
      </View>
    );
  }
}

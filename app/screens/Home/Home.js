import React, { useState, useEffect, useRef, useCallback, Component } from "react";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import { View, Text, Dimensions, Animated, TouchableOpacity, TextInput, FlatList } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import firebase from "firebase/app";
import { Icon, Rating, Image, Button, Card, Divider } from 'react-native-elements';
import { firebaseApp } from "../../utils/firebase";
import { mapRetroStyle } from '../../utils/const';
import BottomSheet from 'reanimated-bottom-sheet';
import styles from "./styles";
import * as Permissions from 'expo-permissions';
import { useNavigation } from "@react-navigation/native";

export default function Home (props) {

  const [region, setRegion] = useState(null);
  const [bars, setBars] = useState(null);
  const navigation = useNavigation();
  const [barIsClicked, setBarIsClicked] = useState(false);
  const sheetRef = useRef(null);
  const [locationChange, setLocationChange] = useState(null);
  const [searchRegion, setSearchRegion] = useState(null);
  const _map = useRef(null);

  const setMapPadding = () => {
    const iosEdgePadding = { top: mapPaddingTop * 0.5, right: 0, bottom: mapPaddingBottom * 0.95, left: 0 };
    const androidEdgePadding = { top: PixelRatio.getPixelSizeForLayoutSize(screen.height * 0), right: 0, bottom: PixelRatio.getPixelSizeForLayoutSize(screen.height * 0.17), left: 0 };
    const edgePadding = (Platform.OS === 'android') ? androidEdgePadding : iosEdgePadding;
    return edgePadding;
  };

  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;

      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localizacion para crear un bar",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
        const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        const locationa = `location=${loc.coords.latitude},${loc.coords.longitude}`;
        const radius = '&radius=2000';
        const type = '&keyword=bar';
        const key = '&key=AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo';
        const restaurantSearchUrl = url + locationa + radius + type + key;
        fetch(restaurantSearchUrl)
          .then((response) => response.json())
          .then((responseJson) => {
            const address = responseJson.results;
            setBars(address);
          }
        );
      }
    })();
  }, [setBarIsClicked]);

  const onRegionChange = (e) => {
    setLocationChange(e);
  }

  const prueba = [
    {
      name: 'Buscar',
      icon: <Icon type="material-community" name="magnify" />,
      function: () => buscar(),
    },
  ];

  const renderHeader = () => (
    <View
      style={styles.header}
    >
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        height={60}
        style={styles.chipsScrollView}
        contentInset={{ // ios only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 20
        }}
      >
        {prueba.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem} onPress={category.function}>
            {category.icon}
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  function Bares(props) {
    const { bar, navigation } = props;
    const { place_id, name, geometry, vicinity, photos, rating } = bar.item;

    const goBar = () => {
      navigation.navigate("barHome", {
        place_id,
        name,
        geometry,
        vicinity,
        photos,
        rating
      });
    };

    return (
      <TouchableOpacity onPress={goBar}>
        <View style={styles.viewRestaurant}>
          <View style={styles.viewRestaurantImage}>
            {!photos && (
              <Image
                key={place_id}
                style={{ minWidth: 80, minHeight: 80, width: 80, height: 80 }}
                resizeMode="cover"
                source={require("../../../assets/img/no-image.png")}
              />
            )}
            {photos?.map((pic, index) => (
              <Image
                key={index}
                style={{ minWidth: 80, minHeight: 80, width: 80, height: 80 }}
                resizeMode="cover"
                source={pic.photo_reference 
                  ? { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${pic.photo_reference}&key=AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo`}
                  : require("../../../assets/img/no-image.png")
                }
              />
            ))}
          </View>
          <View style={{ marginTop: 3}}>
            <Text style={styles.restaurantName}>{bar.item.name}</Text>
            <View style={{flexDirection: "row"}}>
              <Icon type="material-community" size={13} name="map-marker" iconStyle={styles.iconMarker} underlayColor="transparent" />
              <Text style={styles.restaurantAddress}>{bar.item.vicinity}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Rating ratingColor={"#ff0000"} style={styles.rating} imageSize={10} startingValue={bar.item.rating} readonly />
              <Text style={{ fontSize: 10, marginTop: 3, fontWeight: "bold" }}>{bar.item.user_ratings_total}</Text>
            </View>
            {bar.item?.opening_hours?.open_now 
                ? <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 2, color: 'green' }}>Abierto</Text> 
                : <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 2, color: 'red' }}>Cerrado</Text>
              }
          </View>
        </View>
        <Divider style={{ backgroundColor: 'grey' }} />
      </TouchableOpacity>
    );
  }

  const renderContent = () => (
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderWidth: 2,
          borderLeftColor: 'rgba(166, 47, 3, .4)',
          borderTopColor: 'white',
          borderRightColor: 'rgba(166, 47, 3, .4)',
          borderBottomColor: 'white',
          borderStyle:'solid',
          zIndex: 999,
          minHeight: '100%',
          // height: '100%',
        }}
      >
        {bars.length > 0 ? (
          <FlatList
          data={bars}
          renderItem={(bar) => (
            <Bares bar={bar} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          // onEndReached={handleLoadMore}
          // ListFooterComponent={<FooterList isLoading={isLoading} />}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        />
        )
        :(
          <View style={{ alignItems: 'center', alignContent: 'center', flexDirection: "row", marginLeft: 30,}}>
            <Icon type="material-community" color={'red'} name="alert-outline" size={50} />
            <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold', maxWidth: '80%' }}>No se han encontrado bares en esta zona</Text>
          </View>
        )}
      </View>
  );

  const buscar = () => {
    setBars(null);
    // console.log(locationChange);
    const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    const locationa = `location=${locationChange.latitude},${locationChange.longitude}`;
    const radius = '&radius=2000';
    const type = '&keyword=bar';
    const key = '&key=AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo';
    const restaurantSearchUrl = url + locationa + radius + type + key;
    fetch(restaurantSearchUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        const address = responseJson.results;
        setBars(address);
      }
    );
  }

  return(
    <>
      <MapView
        ref={_map}
        style={{ height: '100%'}}
        initialRegion={region}
        customMapStyle={mapRetroStyle}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation
        showsMyLocationButton
      >
        {bars && bars.map((bar, index) => (
          <MapView.Marker
            key={index}
            coordinate={{ latitude : bar.geometry.location.lat , longitude : bar.geometry.location.lng }}
            image={require('../../../assets/img/market.png')}
            onPress={() => setBarIsClicked(!barIsClicked)}
          >
            <Callout tooltip>
              <View style={{ backgroundColor: '#fff', heigth: 20, width: 100}}>
                <Text>{bar.name}</Text>
              </View>
            </Callout>
          </MapView.Marker>
        ))}
      </MapView>
      {bars && (
        <BottomSheet
          ref={sheetRef}
          enabledContentGestureInteraction={false}
          enabledHeaderGestureInteraction
          snapPoints={[500, 80, 80]}
          renderHeader={renderHeader}
          renderContent={renderContent}
        />
      )}
    </>
  )
};

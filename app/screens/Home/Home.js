import React, { useState, useEffect, useCallback, Component, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { View, Text, Image, Dimensions, Animated, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, Button } from "react-native";
import * as Location from 'expo-location';
import firebase from "firebase/app";
import { Icon, Rating, Card } from 'react-native-elements';
import { firebaseApp } from "../../utils/firebase";
import { mapRetroStyle } from '../../utils/const';
import styles from "./styles";
import * as Permissions from 'expo-permissions';
import { Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Home (props) {
  const { navigation } = props;
  const { width, height } = Dimensions.get('screen');
  const [locations, setLocations] = useState([]);
  const _map = React.useRef(null);
  const CARD_WIDTH = width * 0.8;
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  const _scrollView = React.useRef(null);
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
  const [currentPosition, setCurrentPosition] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  })
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High})
      Location.requestPermissionsAsync();
      const loc = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
      setCurrentPosition({
        latitude: loc.coords.latitude || 0,
        longitude: loc.coords.longitude || 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });

      const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
      const locationa = `location=${loc.coords.latitude},${loc.coords.longitude}`;
      const radius = '&radius=200';
      const type = '&keyword=restaurant';
      const key = '&key=AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo';
      const restaurantSearchUrl = url + locationa + radius + type + key;
      fetch(restaurantSearchUrl)
        .then((response) => response.json())
        .then((responseJson) => {
          const address = responseJson.results;
          setLocations(address);
        }
      );

      if (locations.length > 0) {
        mapAnimation.addListener(({ value }) => {
          let index = Math.floor(value / CARD_WIDTH + 0.3);
          if (index >= locations.length) {
            index = locations.length -1;
          }
          if (index <= 0) {
            index = 0;
          }

          clearTimeout(regionTimeout);

          const regionTimeout = setTimeout(() => {
            console.log(mapIndex);
            console.log(index)
            if (mapIndex !== index) {
              mapIndex = index;
              const { location } = locations[index].geometry;
              _map.current.animateToRegion(
                {
                  ...location,
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                },
                0
              );
            }
          }, 10);
        });
      }
    })();
  }, [setLocations, setCurrentPosition]);

  useEffect(() => {


  }, []);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     // console.log(position)
  //     const { latitude, longitude} = position.coords;
  //     setCurrentPosition({
  //       ...currentPosition,
  //       latitude: latitude,
  //       longitude:longitude,
  //       latitudeDelta: 0.001,
  //       longitudeDelta: 0.001,
  //     })
  //   },
  //   (error) =>  console.log(error.message, 3000),
  //     { timeout: 20000, maximumAge: 1000 }
  //   )

  //   mapAnimation.addListener(({ value }) => {
  //     let index = Math.floor(value / CARD_WIDTH + 0.3);
  //     console.log(insex);
  //     if (index >= locations.length) {
  //       index = locations.length -1;
  //     }
  //     if (index <= 0) {
  //       index = 0;
  //     }

  //     clearTimeout(regionTimeout);

  //     const regionTimeout = setTimeout(() => {
  //       if (mapIndex !== index) {
  //         mapIndex = index;
  //         const { location } = locations[index].geometry;
  //         _map.current.animateToRegion(
  //           {
  //             ...location,
  //             latitude: location.lat,
  //             longitude: location.lng,
  //             latitudeDelta: 0.001,
  //             longitudeDelta: 0.001,
  //           },
  //           0
  //         );
  //       }
  //     }, 10);
  //   });
  // }, []);

  const interpolations = locations.map((marker, index) => {
    const inputRange = [
      (index -1 ) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1 ) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });
    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerId = mapEventData._targetInst.return.key;
    let x = (markerId * CARD_WIDTH) + (markerId * 20)
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true});
  }

  const searchBarsInLocation = () => {
    const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    const locationa = `location=${currentPosition.latitude},${currentPosition.longitude}`;
    const radius = '&radius=200';
    const type = '&keyword=bar';
    const key = '&key=AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo';
    const restaurantSearchUrl = url + locationa + radius + type + key;
    fetch(restaurantSearchUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        const address = responseJson.results;
        setLocations(address);
      }
    );
  }

  const prueba = [{
    name: 'geoLocation',
    icon: <Icon type="material-community" name="magnify" />,
    function: () => searchBarsInLocation(),
  },
  {
    name: 'buscarBares',
    icon: <Icon type="material-community" name="magnify" />,
    function: () => searchBarsInLocation(),
  },
  {
    name: 'ghjghj',
    icon: <Icon type="material-community" name="magnify" />,
    function: () => searchBarsInLocation(),
  },
  {
    name: 'jkljklj',
    icon: <Icon type="material-community" name="magnify" />,
    function: () => searchBarsInLocation(),
  },
  {
    name: 'wqqweqwe',
    icon: <Icon type="material-community" name="magnify" />,
    function: () => searchBarsInLocation(),
  },
  ];

  const onRegionChange = (e) => {
    setCurrentPosition(e);
  };

  const prueba2 = (id, name) => {
    navigation.navigate("barHome", {
      id,
      name,
    });
  };

  return(
    <View style={styles.container}>
      {currentPosition.latitude && (
        <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        customMapStyle={mapRetroStyle}
        initialRegion={currentPosition}
        // region={region}
        // showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        minZoomLevel={2}  // default => 0
        maxZoomLevel={20} // default => 20
        onRegionChangeComplete={(e) => onRegionChange(e)}
        showsUserLocation={true}
      >
        {locations.map((market, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={{latitude: market.geometry.location.lat, longitude: market.geometry.location.lng}}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../../assets/img/market.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          )
        })}
      </MapView>
      )}
      <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          height={50}
          style={styles.chipsScrollView}
          contentInset={{ // ios only
            top: 0,
            left: 0,
            bottom: 0,
            right: 20,
          }}
          contentContainerStyle={{
            paddingRight: Platform.OS === 'android' ? 20 : 0
          }}
        >
          {prueba.map((category, index) => (
            <TouchableOpacity key={index} style={styles.chipsItem} onPress={category.function}>
              {category.icon}
              <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              }
            }
          ],
          {useNativeDriver: true}
        )}
      >
        {locations.length > 0
          ? locations.map((market, index) => (
            <TouchableHighlight activeOpacity={0.6}
            underlayColor="#DDDDDD" style={styles.card} onPress={() => prueba2(market.id, market.name)}>
              <View key={index}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View style={{ display: 'flex', marginLeft: 15 }}>
                    {market.photos && market.photos.map((photo, index) => (
                      <Image
                        key={index}
                        style={{
                          marginTop: 20, borderRadius: 15, width: 60, height: 60,
                        }}
                        resizeMode="cover"
                        source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo` }}
                      />
                    ))}
                  </View>
                  <View style={{ display: 'flex', marginLeft: 15 }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5, marginTop: 15, fontWeight: 'bold' }}>{market.name}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Icon type="material-community" size={13} name="map-marker" iconStyle={styles.iconMarker} underlayColor="transparent" />
                      <Text style={{ marginRight: 5, marginTop: 3, color: 'green', fontWeight: 'bold', fontSize: 10 }}>{market.vicinity.replace(/"/g,' ')}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                      <Rating imageSize={10} style={{ left: 0, marginTop: 10 }} startingValue={market.rating} readonly />
                      <Text style={{ marginRight: 5, marginTop: 8, fontWeight: 'bold', color: 'grey', fontSize: 10 }}>{market.user_ratings_total}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          ))
        : (
          <View style={styles.card}>
            <Image
              source={require("../../../assets/img/no-image.png")}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardTitle}>NO FIND BAR</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>No hay bares registrados</Text>
              <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("add-bar")}
                    style={[styles.signIn, {
                      borderColor: "#ff6347",
                      borderWidth: 1
                    }]}
                  >
                    <Text style={[styles.textSign, {
                      color: "#FF6347"
                    }]}>Registrar</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}

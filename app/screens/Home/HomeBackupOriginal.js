import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { View, Text, Image, Dimensions, Animated, TouchableOpacity, TextInput, ScrollView } from "react-native";
import * as Location from 'expo-location';
import firebase from "firebase/app";
import { Icon, Rating, Card } from 'react-native-elements';
import { firebaseApp } from "../../utils/firebase";
import { mapRetroStyle } from '../../utils/const';
import styles from "./styles";
import { Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// import { t } from "../../../locales/index";

export default function Home(props) {

  const { navigation } = props;
  const { width, height } = Dimensions.get('screen');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [region, setRegion] = useState({});
  const db = firebase.firestore(firebaseApp);
  const mapStandardStyle = [];
  const CARD_WIDTH = width * 0.8;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  useFocusEffect(
    useCallback(() => {
      const resultRestaurants = [];
      db.collection("bars")
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const restaurant = doc.data();
            restaurant.id = doc.id;
            resultRestaurants.push(restaurant);
          });
          setRestaurants(resultRestaurants);
        });
    }, [])
  );

  useEffect(() => {
      const loc = navigator.geolocation.getCurrentPosition(
        (position) => {
          setRegion({
            latitude: position.coords.latitude || '',
            longitude: position.coords.longitude || '',
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          });
        },
        (error) => console.log('error'),
      );
  }, [setRegion]);


  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= restaurants.length) {
        index = restaurants.length -1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { location } = restaurants[index];
          _map.current.animateToRegion(
            {
              ...location,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            },
            0
          );
        }
      }, 10);
    });
  });

  const updateIndex = (event) => {
    setSelectedIndex(event);
  };

  const prueba = [{
    name: 'fghfgh',
    icon: <Icon type="material-community" name="magnify" />
  },
  {
    name: 'asdasd',
    icon: <Icon type="material-community" name="magnify" />
  },
  {
    name: 'ghjghj',
    icon: <Icon type="material-community" name="magnify" />
  },
  {
    name: 'jkljklj',
    icon: <Icon type="material-community" name="magnify" />
  },
  {
    name: 'wqqweqwe',
    icon: <Icon type="material-community" name="magnify" />
  },
  ];

  const interpolations = restaurants.map((marker, index) => {
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

  const goRestaurant = (id, name) => {
    console.log(navigation.navigate),
    navigation.navigate("restaurant", {
      id,
      name,
    });
  };

  return (
    // localizacion && (
      <View style={styles.container}>
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          customMapStyle={mapRetroStyle}
          initialRegion={region.latitude && region}
          // region={localizacion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          // followsUserLocation
          zoomEnabled
          minZoomLevel={2}  // default => 0
          maxZoomLevel={15} // default => 20
        >
          {restaurants.map((market, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <MapView.Marker key={index} coordinate={market.location} onPress={(e) => onMarkerPress(e)}>
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
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder='Buscar zona'
            minLength={2} // minimum length of text to search
            autoFocus={true}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed={true}   // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description || row.vicinity} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              // setRegion({
              //   latitude: details?.geometry?.location?.lat || '',
              //   longitude: details?.geometry?.location?.lng || '',
              //   latitudeDelta: 0.001,
              //   longitudeDelta: 0.001,
              // })
              _map.current.animateToRegion(
                {
                  latitude: details?.geometry?.location?.lat || '',
                  longitude: details?.geometry?.location?.lng || '',
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                },
                0
              );
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo',
              language: 'es', // language of the results
              types: 'geocode', // default: 'geocode'
            }}
            styles={{
              description: {
                fontWeight: 'bold'
              },
            }}
            nearbyPlacesAPI={'GoogleReverseGeocoding'} // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              key: 'AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo',
              language: 'es',
            }}
          />
        </View>
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
            <TouchableOpacity key={index} style={styles.chipsItem}>
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
          {restaurants && restaurants.length > 0
            ? restaurants.map((market, index) => (
              // <View style={styles.card} key={index}>
              //   <Image
              //     source={{ uri: market.images[0] }}
              //     style={styles.cardImage}
              //     resizeMode="cover"
              //   />
              //   <View style={styles.textContent}>
              //   <Rating imageSize={10} startingValue={market.rating} readonly />
              //     <Text numberOfLines={1} style={styles.cardTitle}>{market.name}</Text>
              //     <Text numberOfLines={1} style={styles.cardDescription}>{market.description}</Text>
              //     <View style={styles.button}>
              //       <TouchableOpacity
              //         onPress={() => goRestaurant(market.id, market.name)}
              //         style={[styles.signIn, {
              //           borderColor: "#ff6347",
              //           borderWidth: 1
              //         }]}
              //       >
              //         <Text style={[styles.textSign, {
              //           color: "#FF6347"
              //         }]}>Visitar</Text>
              //       </TouchableOpacity>
              //     </View>
              //   </View>
              // </View>
              // <View style={styles.card} key={index}>
              //   <Card
              //     containerStyle={{
              //       flex: 1,
              //       width: width * 0.95,
              //       alignSelf: 'center',
              //       height: height * 0.15,
              //       position: 'absolute',
              //       bottom: height * 0.30,
              //     }}
              //     titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
              //     title={(
              //       <View style={{ display: 'flex', flexDirection: 'row' }}>
              //         <Text style={{
              //           marginLeft: 10,
              //           marginBottom: 10,

              //           fontSize: 15,
              //           fontWeight: 'bold',
              //         }}
              //         >
              //           {market.name}
              //         </Text>
              //       </View>
              //     )}
              //   >
              //     <View style={{ display: 'flex', flexDirection: 'row' }}>
              //       <Image
              //         style={{
              //           marginLeft: 10, borderRadius: 15, width: 60, height: 60,
              //         }}
              //         resizeMode="cover"
              //         source={{ uri: market.images[0] }}
              //       />
              //       <View style={{ display: 'flex', marginLeft: 15 }}>
              //         <View style={{ display: 'flex', flexDirection: 'row' }}>
              //           <Text style={{ marginRight: 5, marginTop: 5, fontWeight: 'bold' }}>Calle:</Text>
              //           <Text style={{ marginRight: 5, marginTop: 5 }}>{market.description}</Text>
              //         </View>
              //         {/* <View style={{ display: 'flex', flexDirection: 'row' }}>
              //           <Button
              //             icon={<Icon name="add" color="black" />}
              //             titleStyle={{
              //               fontSize: 15, color: 'black', fontWeight: 'bold',
              //             }}
              //             buttonStyle={{
              //               backgroundColor: 'transparent',

              //             }}
              //             title="Visitar"
              //           />
              //         </View> */}
              //       </View>
              //     </View>
              //   </Card>
              // </View>
              <View style={styles.card} key={index}>
            {/* <Card>
              <Card.Title>HELLO WORLD</Card.Title>
              <Card.Divider/>
              <Image source={{ uri: market.images[0] }}>
                <Text style={{marginBottom: 10}}>
                  The idea with React Native Elements is more about component structure than actual design.
                </Text>
              </Image>
            </Card> */}
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ display: 'flex', marginLeft: 15 }}>
                  <Image
                    style={{
                      marginTop: 20, borderRadius: 15, width: 60, height: 60,
                    }}
                    resizeMode="cover"
                    source={{ uri: market.images[0] }}
                  />
                </View>
                <View style={{ display: 'flex', marginLeft: 15 }}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={{ marginRight: 5, marginTop: 15, fontWeight: 'bold' }}>{market.name}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5, marginTop: 5 }}>{market.description}</Text>
                  </View>
                  {/* <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button
                      icon={<Icon name="add" color="black" />}
                      titleStyle={{
                        fontSize: 15, color: 'black', fontWeight: 'bold',
                      }}
                      buttonStyle={{
                        backgroundColor: 'transparent',

                      }}
                      title="Visitar"
                    />
                  </View> */}
                </View>
              </View>
            </View>
            ))
          : (
            // <View style={styles.card}>
            //   <Image
            //     source={require("../../../assets/img/no-image.png")}
            //     style={styles.cardImage}
            //     resizeMode="cover"
            //   />
            //   <View style={styles.textContent}>
            //     <Text numberOfLines={1} style={styles.cardTitle}>NO FIND BAR</Text>
            //     <Text numberOfLines={1} style={styles.cardDescription}>No hay bares registrados</Text>
            //     <View style={styles.button}>
            //         <TouchableOpacity
            //           onPress={() => navigation.navigate("add-bar")}
            //           style={[styles.signIn, {
            //             borderColor: "#ff6347",
            //             borderWidth: 1
            //           }]}
            //         >
            //           <Text style={[styles.textSign, {
            //             color: "#FF6347"
            //           }]}>Registrar</Text>
            //         </TouchableOpacity>
            //       </View>
            //   </View>
            // </View>
            <View></View>
          )}
        </Animated.ScrollView>
      </View>
    // )
  );
}

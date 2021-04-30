import React, { useState, useEffect, useRef, useCallback, Component } from "react";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import { View, Text, Image, Dimensions, Animated, TouchableOpacity, TextInput, FlatList, ScrollView } from "react-native";
import * as Location from 'expo-location';
import firebase from "firebase/app";
import { Icon, Rating, Button, Card, Divider } from 'react-native-elements';
import { firebaseApp } from "../../utils/firebase";
import { mapRetroStyle } from '../../utils/const';
import styles from "./styles";
import * as Permissions from 'expo-permissions';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import BottomSheet from 'reanimated-bottom-sheet';

export default function Home (props) {

  const [region, setRegion] = useState(null);
  const [bars, setBars] = useState(null);
  const [barIsClicked, setBarIsClicked] = useState(false);
  const sheetRef = useRef(null);
  const [locationChange, setLocationChange] = useState(null);
  const [showButtonBuscar, setShowButtonBuscar] = useState(true);
  const [searchRegion, setSearchRegion] = useState(null);
  const _map = useRef(null);

  useEffect(() => {
    (async () => {
      console.log('entra')
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
        const radius = '&radius=10000';
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

  const renderHeader = () => (
    <>
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
                  <Button
          title="Buscar"
          containerStyle={{ alignItems: 'center' }}
          buttonStyle={styles.btnRegister}
          onPress={buscar}
        />
          {prueba.map((category, index) => (
            <TouchableOpacity key={index} style={styles.chipsItem}>
              {category.icon}
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );

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
          height: '100%',
        }}
      >
        {bars.map((bar, index)=>(
          <>
          <View style={styles.viewRestaurant}>
            <View style={styles.viewRestaurantImage}>
              <Image
                resizeMode="cover"
                source={require("../../../assets/img/no-image.png")}
                style={styles.imageRestaurant}
              />
            </View>
            <View style={{ marginTop: 3}}>
              <Text style={styles.restaurantName}>{bar.name}</Text>
              <View style={{flexDirection: "row"}}>
                <Icon type="material-community" size={13} name="map-marker" iconStyle={styles.iconMarker} underlayColor="transparent" />
                <Text style={styles.restaurantAddress}>asdasd</Text>
              </View>
              <Text style={styles.restaurantDescription}>asdasd</Text>
              <View style={{flexDirection: "row"}}>
                <Rating ratingColor={"#ff0000"} style={styles.rating} imageSize={10} startingValue={0} readonly />
                <Text style={{ fontSize: 10, marginTop: 3, fontWeight: "bold" }}>{10}</Text>
              </View>
            </View>
          </View>
          <Divider style={{ backgroundColor: 'grey' }} />
          </>
        ))}
      </View>
  );

  const buscar = () => {
    setShowButtonBuscar(false);
    console.log(locationChange);
    const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    const locationa = `location=${locationChange.latitude},${locationChange.longitude}`;
    const radius = '&radius=10000';
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

  const onRegionChange = (e) => {
    setLocationChange(e);
  }

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
  ];

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
    <GooglePlacesAutocomplete
      placeholder='Buscar zona'
      minLength={2} // minimum length of text to search
      autoFocus={true}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed={true}   // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description || row.vicinity} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        setSearchRegion({
          latitude: details?.geometry?.location?.lat || '',
          longitude: details?.geometry?.location?.lng || '',
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        })
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
          fontSize: 12,
          fontWeight: 'bold',
        },
        container: {
          marginTop: 100,
          zIndex: 9999,
          position: 'absolute',
          width: '90%',
          borderRadius: 5,
          marginLeft: 20,
          shadowColor: "#ccc",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
      },
      textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          height: 200,
      },
      textInput: {
          marginLeft: 5,
          marginRight: 5,
          color: '#A62F03',
          fontWeight: 'bold',
          fontSize: 12,
          height: 40,
          borderRadius: 30,
          borderWidth: 2,
          borderColor: 'rgba(166, 47, 3, .4)',
          borderStyle:'solid',
      },
      listView: {
          flex: 1,
          position: 'absolute',
          top: 50,
          backgroundColor: 'white',
          width: '50%',
          alignContent: 'center',
          alignSelf: 'center',
          width: '100%',
          color: 'black',
      },
      row: {
          height: 40
      },
      poweredContainer: {
          display: 'none'
      },
      powered: {
          display: 'none'
      }
      }}
      nearbyPlacesAPI={'GoogleReverseGeocoding'} // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        key: 'AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo',
        language: 'es',
      }}
    />
      {bars && (
        <BottomSheet
          ref={sheetRef}
          enabledHeaderGestureInteraction
          snapPoints={[500, 75, 100]}
          renderHeader={renderHeader}
          renderContent={renderContent}
        />
      )}
    </>
  )
};

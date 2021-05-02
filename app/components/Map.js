import React from "react";
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";
import { mapRetroStyle } from '../utils/const';

export default function Map(props) {
  const { location, name, height } = props;

  const loc = {
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  }

  const openAppMap = () => {
    openMap({
      latitude: location.lat,
      longitude: location.lng,
      zoom: 19,
    });
  };

  return (
    <MapView
      style={{ height: height, width: "100%" }}
      initialRegion={loc}
      onPress={openAppMap}
      customMapStyle={mapRetroStyle}
    >
      <MapView.Marker
        coordinate={{
          latitude: location.lat,
          longitude: location.lng,
        }}
        image={require('../../assets/img/market.png')}
      />
    </MapView>
  );
}

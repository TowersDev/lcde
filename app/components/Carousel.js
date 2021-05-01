import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import Carousel, { Pagination } from "react-native-snap-carousel";

export default function CarouselImages(props) {
  const { arrayImages, height, width } = props;
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <Image
        key={index}
        style={{ width, height }}
        resizeMode="cover"
        source={{ uri: item.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=AIzaSyBWfgqqPQVNzth2HY5cVApgGuIpFGEwFVo` : '../../../assets/img/no-image.png' }}
      />
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.carousel}>
        <Carousel
          data={arrayImages}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          firstItem={0}
          loop={false}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={arrayImages?.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotColor="rgba(255, 255, 255, 0.92)"
          dotStyle={styles.paginationDot}
          inactiveDotColor="white"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    minHeight: 250,
  },
  carousel: {},
  paginationContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    paddingVertical: 8,
    marginTop: 200,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
  },
});

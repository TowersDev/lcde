import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 10,
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 80,
    height: 80,
  },
  restaurantName: {
    fontWeight: "bold",
    marginLeft: 3
  },
  restaurantAddress: {
    color: "green",
    fontSize: 10,
  },
  iconMarker: {
    color: "green",
    marginTop: 1,
    marginRight: 3
  },
  iconBeer: {
    color: "#A62F03",
  },
  restaurantDescription: {
    paddingTop: 2,
    fontSize: 10,
    color: "grey",
    marginLeft: 3,
    width: 300,
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  rating: {
    left: 0,
    marginTop: 5,
    marginRight: 3,
  }
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 30,
    borderWidth: 0,
  },
  containerIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    padding: 5,
    borderRadius: 500,
    backgroundColor: "#fff"
  },
  restaurantImage: {
    width: "100%",
    height: 200,
  },
  titleRating: {
    // flexDirection: "row",
    marginTop: 10,
  },
  rating: {
    flexDirection: "row",
    position: "absolute",
    right:0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  description: {
    color: "grey",
    marginTop: 0,
    textAlign: "justify",
  },
  textRatingTotal: {
    fontWeight: "bold",
    marginLeft: 5,
  }
});

export default styles;

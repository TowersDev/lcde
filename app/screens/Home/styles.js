import { Dimensions } from "react-native";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },

  searchBox: {
    position: "absolute",
    marginTop: Platform.os === 'ios' ? 40 : 40,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: '90%',
    borderRadius: 5,
    marginLeft: 20,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  iconHeaderRight: {
    marginTop: 12,
    marginRight: 10
  },
  chipsScrollView: {
    position: 'absolute',
    top:Platform.OS === 'ios' ? 20: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, .6)',
    // paddingTop: 8,
    marginLeft: 20,
    marginRight: 20,
    zIndex: 9999,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    borderWidth: 2,
    borderColor: 'rgba(166, 47, 3, .4)',
    borderStyle:'solid',
    elevation: 5,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: "#fff",
    height: 100,
    width: 300,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: '50%',
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
  iconMarker: {
    color: "green",
    marginTop: 3,
    marginRight: 3
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderLeftColor: 'rgba(166, 47, 3, .4)',
    borderTopColor: 'rgba(166, 47, 3, .4)',
    borderRightColor: 'rgba(166, 47, 3, .4)',
    borderBottomColor: 'white',
    borderStyle:'solid',

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
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    // marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#A62F03",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});

export default styles;

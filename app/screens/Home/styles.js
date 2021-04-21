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
    // position: "absolute",
    marginTop: Platform.os === 'ios' ? 40 : 7,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 5,
    marginLeft: 20,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 5
  },
  iconHeaderRight: {
    marginTop: 12,
    marginRight: 10
  },
  chipsScrollView: {
    position: 'absolute',
    top:Platform.OS === 'ios' ? 90 : 70,
    paddingHorizontal: 10,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    // shadowRadius: 5,
    // shadowOpacity: 1,
    // shadowOffset: { x: 2, y: -2 },
    height: 100,
    width: width * 0.8,
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
});

export default styles;

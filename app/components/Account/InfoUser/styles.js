import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    flexDirection: "row",
  },
  userInfoAvatar: {
    marginRight: 25,
    borderRadius: 100,
    padding: 3,
    backgroundColor: "#f2f2f2",
    top: -5,
    left: 10,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15,
  },
  image: {
    width: "100%",
    height: 100,
  },
  cervezaFav: {
    backgroundColor: "#ff0000",
    marginLeft: 10,
    width: 150,
    height: 50,
    alignItems: "center",
    alignContent: "center"
  }
});

export default styles;

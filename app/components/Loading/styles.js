import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#A62F03",
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#A62F03",
    textTransform: "uppercase",
    marginTop: 10,
  },
});

export default styles;

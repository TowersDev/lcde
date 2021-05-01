import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";

export default function InfoUser(props) {
  const {
    userInfo: { uid, photoURL, displayName, email },
    toastRef,
    setLoading,
    setLoadingText,
    setRealoadUserInfo,
  } = props;

  const navigation = useNavigation();

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show("Has cerrado la seleccion de imagenes");
      } else {
        uploadImage(result.uri)
          .then(() => {
            updatePhotoUrl();
          })
          .catch((res) => {
            toastRef.current.show(res);
          });
      }
    }
  };

  const uploadImage = async (uri) => {
    setLoadingText("Actualizando Avatar");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = () => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setLoading(false);
      })
      .catch(() => {
        toastRef.current.show("Error al actualizar el avatar.");
      });
  };

  return (
    <>
      <TouchableOpacity style={styles.viewFavorite} onPress={()=> navigation.navigate("profileAccount", {
            params: setRealoadUserInfo,
          })}
      >
        <Icon
          type="material-community"
          name="settings-outline"
          iconStyle={styles.iconHeaderRight} // para cambiar colores y forma del icono
          underlayColor="transparent"
        />
      </TouchableOpacity>
      <Image
          resizeMode="cover"
          style={styles.image}
          // PlaceholderContent={<ActivityIndicator color="#fff" />}
          source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
          onPress={() => console.log('presiono')}
          blurRadius={2}
        />
      <View style={styles.viewUserInfo}>
        <Avatar
          rounded
          size="large"
          showEditButton
          onEditPress={changeAvatar}
          containerStyle={styles.userInfoAvatar}
          source={
            photoURL
              ? { uri: photoURL }
              : require("../../../../assets/img/avatar-default.jpg")
          }
        />
        <View>
          <Text style={styles.displayName}>
            {displayName ? displayName : "Anónimo"}
          </Text>
          <Text>{email ? email : "Socia Login"}</Text>
        </View>
      </View>
    </>
  );
}

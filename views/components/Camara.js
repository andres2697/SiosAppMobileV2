import {
  StyleSheet,
  Text,
  View,
  Animated,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import AppLoading from "expo-app-loading";
import { Camera, CameraType } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  useNavigation,
  NavigationAction,
  useRoute,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { GLView } from "expo";
import Expo2DContext from "expo-2d-context";

const Camara = (props) => {
  const route = useRoute();
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const camRef = useRef(null);
  const [tomandoFoto, setTomandoFoto] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const cargarCamaraPermisos = useCallback(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    let permisos = false;
    if (status === "granted") {
      permisos = true;
    }
    setHasPermission(permisos);
  });

  useEffect(() => {
    cargarCamaraPermisos();
  }, []);

  const takePick = async () => {
    setTomandoFoto(true);
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: false,
      autoFocus: true,
      aspect: [4, 3],
      quality: 1,
    };
    if (camRef) {
      try {
        const data = await camRef.current.takePictureAsync(options);
        setTomandoFoto(false);
        setCapturedPhoto(data);
        } catch (e) {
            console.log(e);
        }
    }
  };

  const Iconos = createIconSetFromIcoMoon(
    require("../../icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  const [iconsLoaded] = Fuentes({
    IcoMoon: require("../../icons/icomoon.ttf"),
  });
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
  });

  if (!iconsLoaded || !fontsLoaded) {
    // return
    // <View>
    return <AppLoading />;
  }

  if (hasPermission === null || hasPermission === undefined) {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <Text>Nulo</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "column", justifyContent:"center" }}>
      {(() => {
          if (capturedPhoto){
            return (
                <View
                  style={{
                    justifyContent: "center",
                    alignContent:"center",
                    alignItems:"center",
                    width: "100%",
                  }}
                >
                  <Image
                    source={{ uri: capturedPhoto.uri }}
                    style={[
                      styles.imagenPrevia,
                      {
                        height: windowHeight - 290,
                        width: windowWidth - 50,
                        marginTop: 30,
                      },
                    ]}
                  ></Image>
                </View>
            );
          } 
          else{
            return (
              <Camera
                type={type}
                ref={camRef}
                style={{
                  flex: 1,
                  marginTop: 30,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: windowWidth - 50,
                  height: windowHeight - 290,
                  borderRadius: 20,
                }}
              ></Camera>
            );
          } 
        })()
      }
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {
            capturedPhoto ? 
                <View style={{ width: "100%", flexDirection: "row", justifyContent:"center" }}>
                    <TouchableOpacity
                    style={[
                        styles.contenedorAcciones,
                        { backgroundColor: "white", marginTop: 15 },
                    ]}
                    onPress={() => {
                        props.callback(capturedPhoto);
                    }}
                    >
                    <Entypo
                        name="check"
                        size={28}
                        color="black"
                        style={{ alignSelf: "center" }}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[
                        styles.contenedorAcciones,
                        { backgroundColor: "red", marginTop: 15, marginLeft: 50 },
                    ]}
                    onPress={() => {
                        // setFotoTomada(false);
                        setCapturedPhoto(null);
                    }}
                    >
                    <Iconos
                        name="borrar"
                        size={45}
                        color="white"
                        style={{ alignSelf: "center", marginTop: -5 }}
                    />
                    </TouchableOpacity>
                </View>
            : 
                <TouchableOpacity
                    style={[styles.contenedorAcciones, { marginBottom: 50 }]}
                    onPress={takePick}
                >
                    {
                        tomandoFoto ? 
                            <ActivityIndicator size={'large'} color="#2166E5" style={{alignSelf:"center"}}/>
                        :
                            <Feather
                                name="camera"
                                size={30}
                                color="black"
                                style={{ alignSelf: "center" }}
                            ></Feather>
                    }
                </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default Camara;

const styles = StyleSheet.create({
  contenedorAcciones: {
    backgroundColor: "white",
    height: 70,
    width: 70,
    justifyContent: "center",
    paddingVertical: 20,
    // marginBottom: 40,
    borderRadius: 50,
  },
  imagenPrevia: {
    borderRadius: 10,
  },
});

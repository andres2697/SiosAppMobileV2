import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import React, { Component } from "react";
import { KeyboardAvoidingView } from "react-native";
import fondo from "../assets/img/fondo.png";
import SvgComponent from '../assets/img/svg/logo_svg.js';
import LoginForm  from './components/LoginForm.js';
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { useFonts as Fuentes} from "expo-font";
import AppLoading from "expo-app-loading";

const Login = (props) => {
  const Iconos = createIconSetFromIcoMoon(
      require("../icons/selection.json"),
      "IcoMoon",
      "icomoon.ttf"
  );
  const [iconsLoaded] = Fuentes({
      IcoMoon: require("../icons/icomoon.ttf"),
  });
  const [fontsLoaded] = useFonts({
      Urbanist_400Regular,
  });

  if (!iconsLoaded || !fontsLoaded) {
      return <AppLoading />;
  }
    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
           keyboardVerticalOffset={-220}>
    
          <ImageBackground resizeMode="cover" source={fondo} style={styles.imagen}>
            <View style={styles.containerGeneral}>
              <View style={[styles.viewsContainer, styles.inputContainer]}>
                <View style={styles.contenedorLogo}>
                  <SvgComponent></SvgComponent>
                </View>
                <LoginForm></LoginForm>
              </View>
              <View style={{paddingBottom: 30}}>
                <Text> IOS Comunicaciones 2022 </Text>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
    );
}
  
export default Login;

const styles = StyleSheet.create({
  containerSA: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  containerL: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  containerGeneral: {
    width: "85%",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginVertical: '15',
    backgroundColor: "rgba(33, 102, 229, 0.05)",
    marginTop: "8%",
    paddingTop: 50,
    borderRadius: 15,
  },
  contenedorLogo: {
    marginBottom: 60
  },
  viewsContainer: {
    width: "90%",
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    height: 50,
    flex: 1,
  },
  inputCorreo: {
    marginBottom: 35,
  },
  test: {
    width: 100,
    height: 50,
  },
  imagen: {
    // flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  imagenLogo: {
    marginBottom: 40,
    width: 180,
    height: 180,
    resizeMode: 'contain'
  },
  inputs: {
    width: "100%",
    height: 25,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "rgba(249, 249, 249, 0.5)",
    color: "rgb(0, 0, 0)",
    fontWeight: "bold",
  },
  iconos: {
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: "100%",
    color: 'black'
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import React, { Component } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import fondo from "../assets/img/fondo.png";
// import { createIconSetFromIcoMoon } from '@expo/vector-icons';
// import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';
import SvgComponent from '../assets/img/svg/logo_svg.js';
import Correo from "./components/Correo.js";
import Contrasenia from "./components/Contrasenia.js";
import AppLoading from "expo-app-loading";





class Login extends React.Component {
  // iniciarSesion = () => {
    // signInWithEmailAndPassword(auth, "adpanfilo@ioscomunicaciones.com", "1234567")
    //   .then((userCredentials) => {
    //     console.log("login");
    //   })
    //   .catch((error) => {
      //     console.log(error);
    //   });
  //   console.log('pass');
  // };
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (<Correo></Correo>);
    // return (<Text>Hola Mundo</Text>);
  }
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     correo: "",
  //         callbackFunction: (childData) => {
  //           this.setState({correo: childData})
  //         },
  //   }

  // }
  // render(){
  //   return (
  //           // <SafeAreaView style={styles.containerSA}>
  //           // <KeyboardAwareScrollView
  //           //   resetScrollToCoords={{ x: 0, y: 0 }}
  //           //   contentContainerStyle={styles.containerL}
  //           //   scrollEnabled
  //           // >
  //     <KeyboardAvoidingView
  //       style={styles.container}
  //       behavior={Platform.OS === "ios" ? "padding" : "height"}
  //        keyboardVerticalOffset={-220}>
  
  //       <ImageBackground resizeMode="cover" source={fondo} style={styles.imagen}>
  //         <View style={styles.containerGeneral}>
  //           <View style={[styles.viewsContainer, styles.inputContainer]}>
  //                     {/* <Logo/> */}
  //             <View style={styles.contenedorLogo}>
  //               <SvgComponent></SvgComponent>
  //             </View>
  //             {/* <CorreoInput></CorreoInput> */}
  //             {/* <CorreoInput parentCallback = {()=>this.callbackFunction()}></CorreoInput> */}
  //             {/* <ContraseniaInput></ContraseniaInput> */}
  //             <Text>{this.state.correo}</Text>
  //           </View>
  //           <View style={[styles.buttonContainer]}>
  //             <TouchableOpacity
  //               style={styles.button}
  //               onPress={() => iniciarSesion()}
  //             >
  //               <Text style={styles.buttonText}>Iniciar Sesion</Text>
  //             </TouchableOpacity>
  //           </View>
  //           <View style={{paddingBottom: 30}}>
  //             <Text> IOS Comunicaciones 2022 </Text>
  //           </View>
  //         </View>
  //       </ImageBackground>
  //     </KeyboardAvoidingView>
            // </KeyboardAwareScrollView>
        // </SafeAreaView>
  //   );
  // }
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
    marginBottom: 50
  },
  viewsContainer: {
    width: "80%",
    height: 'auto',
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
  buttonContainer: {
    width: "80%",
    flex: 1,
    marginTop: '25%',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button:{
    backgroundColor: '#2166E5',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius:20,
  },
  buttonText:{
      color: 'white'
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

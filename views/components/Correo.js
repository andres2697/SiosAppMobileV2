import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import { AsyncStorageStatics } from '@react-native-community/async-storage';
import { TextInput } from "react-native-paper";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import AppLoading from "expo-app-loading";
// import { useFonts, Urbanist_400Regular } from '@expo-google-fonts/urbanist';r
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

class Correo extends React.Component {
  handleText = (text) => {
    this.setState({ correo: text });
    // this.sendData(text);
  };

  constructor(props) {
    //-------------------------------//
    //-- Inicialización de Fuentes --//
    //-------------------------------//
    super(props);
    // this.callbackFunction = this.sendData.bind(this)

    this.state = {
      correo: "",
    };
  }
  
  render() {
    
    // const Iconos = createIconSetFromIcoMoon(
    //   require("../../icons/selection.json"),
    //   "IcoMoon",
    //   "icomoon.ttf"
    // );
    // const [iconsLoaded] = Fuentes({
    //   IcoMoon: require("../../icons/icomoon.ttf"),
    // });
  
    //-------------------------------//
    
    //-------------------------------//
    //-- Inicialización de Iconos. --//
    //-------------------------------//
    // if (!iconsLoaded) return <AppLoading/>;
    //-------------------------------//
    return (
      <View style={{alignContent: "center", alignItems: "center", justifyContent:"center", alignSelf:"center", height:'100%', width:'80%'}}>
        <TextInput
          style={[styles.inputs, styles.inputCorreo]}
          // left={
            //   <TextInput.Icon
            //     name={() => <Iconos name="usuario" size={35} />}
            //     style={styles.iconos}
            //     color="black"
            //   />
            // }
          placeholder="Correo"
          keyboardType="email-address"
          underlineColor="transparent"
          autoFocus={false}
          activeUnderlineColor="rgba(33, 102, 229, 0.5)"
          onChangeText={(text) => this.handleText(text)}
          value={this.state.correo}
          ></TextInput>
        </View>
    );
  }
}

export default Correo;

const styles = StyleSheet.create({
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
    borderTopWidth: 6,
    borderTopColor: "rgba(200, 200, 200, 0.2)",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // fontWeight: "bold",
    fontFamily: "Urbanist_400Regular",
  },
  inputCorreo: {
    marginBottom: 35,
  },
  iconos: {
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: "100%",
    color: "black",
    shadowOpacity: 0.3,
  },
});

import {
  StyleSheet,
  View,
  Text,
  // TextInput,
} from "react-native";
import { useState, useRef } from "react";
import { HelperText, TextInput, Button } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { async } from "@firebase/util";
import { AntDesign } from '@expo/vector-icons'; 

const CoordenadasCab24 = (props) => {
  const folio = props.folio;
  const title = props.title;

  const Iconos = createIconSetFromIcoMoon(
    require("../../../../icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  const [iconsLoaded] = Fuentes({
    IcoMoon: require("../../../../icons/icomoon.ttf"),
  });
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
  });

  if (!iconsLoaded || !fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <View style={{ width: "100%", flexDirection: "row", paddingVertical:5, paddingLeft:'7%' }}>
        <View style={styles.contenedorBlancoCoordenadas}>
          <HelperText style={styles.helperCoordenadas}>Cantidad</HelperText>
          <View style={styles.contenedorGrisCoordenadas}>
            <Text>{title}</Text>
          </View>
        </View>
        <View style={{ width: "18%", justifyContent: "center" }}>
          <Button
            mode="contained"
            compact={true}
            onPress={() => {
              console.log("Reubicando...");
            }}
            // contentStyle={{ height: 40 }}
            uppercase={false}
            color="white"
            style={{
              backgroundColor: "#2166E5",
              borderRadius: 50,
              alignSelf: 'flex-end',
            //   width: 50
            }}
          >
            <AntDesign name="find" size={22} color="white"/>
          </Button>
        </View>
        <View  style={{ width: "17%", justifyContent: "center" }}>
            <Button
                // mode="contained"
                compact={true}
                onPress={() => {
                    console.log("Eliminando...");
                }}
                // contentStyle={{ height: 40 }}
                uppercase={false}
                color="white"
                style={{
                    backgroundColor: "#EC2137",
                    borderRadius: 50,
                    alignSelf: 'flex-end',
                    //   width: 50
                }}
            >
                <Iconos name="borrar" size={25} color="white"/>
            </Button>
        </View>
      </View>
    </View>
  );
};

export default CoordenadasCab24;

const styles = StyleSheet.create({
  contenedorSelectMaterial: {
    flexDirection: "row",
    padding: 8,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 10,
  },
  inputCustomizedInfoCab: {
    width: "100%",
    height: 45,
    backgroundColor: "#EDF2F9",
    alignSelf: "center",
    fontSize: 15,
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 10,
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    marginTop: "-9%",
    zIndex: 1,
  },
  helperConcepto: {
    height: 25,
    fontWeight: "bold",
    color: "black",
    fontSize: 11,
    alignSelf: "flex-start",
    marginTop: "-6%",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  helperCoordenadas: {
    height: 25,
    fontWeight: "bold",
    color: "black",
    fontSize: 11,
    alignSelf: "flex-start",
    marginTop: "-5%",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  agregar: {
    backgroundColor: "#EDF2F9",
    height: 50,
    width: "70%",
    borderRadius: 10,
    justifyContent: "center",
    paddingTop: "8%",
    marginLeft: "6%",
    paddingLeft: "3%",
  },
  coordenadas: {
    width: "100%",
    marginTop: 10,
    marginLeft: "5%",
    flexDirection: "row",
  },
  contenedorBlancoCoordenadas: {
    backgroundColor: "white",
    elevation: 4,
    width: "65%",
    height: 60,
    flexDirection: "column",
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  contenedorGrisCoordenadas: {
    width: "90%",
    backgroundColor: "#EDF2F9",
    height: 40,
    borderRadius: 10,
    zIndex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-4%",
  },
});

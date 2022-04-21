import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView
  // TextInput,
} from "react-native";
import { useState, useRef } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { Picker } from "@react-native-picker/picker";
import EntradaMateriales from "./Componentes/EntradaMateriales";

const Miscelaneos = (props) => {
  const folio = props.route.params.folio;
  const [materialSeleccionado, setMaterialSeleccionado] = useState("default");
  const [habilitado, setHabilitado] = useState(true);
  const [cantidad, setCantidad] = useState("1");

  const Iconos = createIconSetFromIcoMoon(
    require("../../../icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  const [iconsLoaded] = Fuentes({
    IcoMoon: require("../../../icons/icomoon.ttf"),
  });
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
  });

  if (!iconsLoaded || !fontsLoaded) {
    return <AppLoading />;
  }

  return (
      <ScrollView style={styles.contenedorPrincipal}>
        <View style={styles.contenedorPrincipal}>
        <View style={[styles.contenedorMiscelaneos, { marginBottom: 5 }]}>
            <EntradaMateriales folio={folio} tipoMaterial='1'></EntradaMateriales>
        </View>
        <View style={[styles.contenedorMiscelaneos, { marginBottom: 5 }]}>
            <EntradaMateriales folio={folio} tipoMaterial='1'></EntradaMateriales>
        </View>
            <TouchableWithoutFeedback
                onPress={()=>{
                    console.log('Boton Agregar')
                }}
                style={{ width: "65%" }}
            >
                <View style={ styles.botonAgregar }>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Agregar material</Text>
                    <Iconos name="agregar" size={35} style={{ fontWeight: 'bold' }}></Iconos>
                </View>
            </TouchableWithoutFeedback>
        </View>
      </ScrollView>
  );
};

export default Miscelaneos;

const styles = StyleSheet.create({
  contenedorPrincipal: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    paddingTop: 20,
  },
  contenedorMiscelaneos: {
    width: "85%",
    flexDirection: "column",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 35,
  },
  botonAgregar: {
    width: '50%', 
    padding: 5,
    marginTop: 25,
    elevation: 6, 
    flexDirection: 'row',
    justifyContent: "center",
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: "center", 
    backgroundColor: '#EDF2F9',
    borderRadius: 10, 
  }
});

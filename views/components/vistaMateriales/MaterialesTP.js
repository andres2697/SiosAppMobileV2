  import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    ScrollView
  } from "react-native";
  import { useFonts as Fuentes } from "expo-font";
  import { useState, useRef } from "react";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import EntradaMateriales from "./Componentes/EntradaMateriales";
  
  const MaterialesTP = (props) => {
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
                <View style={[styles.contenedorMaterialesTP, { marginBottom: 5 }]}>
                <EntradaMateriales folio={folio} tipoMaterial='2'></EntradaMateriales>
                </View>
                <View style={[styles.contenedorMaterialesTP, { marginBottom: 5 }]}>
                <EntradaMateriales folio={folio} tipoMaterial='2'></EntradaMateriales>
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
  
  export default MaterialesTP;
  
  const styles = StyleSheet.create({
    contenedorPrincipal: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingTop: 20,
      },
      contenedorMaterialesTP: {
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
  
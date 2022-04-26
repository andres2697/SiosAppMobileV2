import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    FlatList
    // ScrollView
  } from "react-native";
  import { ScrollView } from 'react-native-virtualized-view';
  import { useFonts as Fuentes } from "expo-font";
  import { useState, useRef } from "react";

  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import EntradaConceptos from "./componentes/EntradaConceptos";
  import Cab24 from "./componentes/Cab24";
  
  const Conceptos = (props) => {
    const folio = props.route.params.folio;
    const [materialSeleccionado, setMaterialSeleccionado] = useState("default");
    const [habilitado, setHabilitado] = useState(true);

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
              <View style={{ paddingTop: 30, paddingBottom: 20, width: '85%', alignSelf: "center" }}>
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>Folio: {folio}</Text>
              </View>
                <View style={ styles.contenedorCab24 }>
                    <Cab24 folio={folio} tipoMaterial='2'></Cab24>
                </View>
                <View>
                    <EntradaConceptos folio={folio} tipoMaterial='2'></EntradaConceptos>
                </View>
            </View>
        </ScrollView>
    );
  };
  
  export default Conceptos;
  
  const styles = StyleSheet.create({
    contenedorConceptos: {
        width: '85%',
        flexDirection: 'row',
        alignSelf:  "center",
        marginTop: 25,
        marginBottom: 35,
    },
    contenedorPrincipal: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        // paddingTop: 20,
        paddingBottom: '10%',
      },
      contenedorCab24: {
        width: "85%",
        flexDirection: "column",
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 50,
        marginRight: '7%',

      },
      contenedorMaterialesTP: {
        width: "85%",
        flexDirection: "column",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 35,
      }
  });
  
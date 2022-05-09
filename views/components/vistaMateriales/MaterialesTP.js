  import {
    StyleSheet,
    View,
  } from "react-native";
  import { useFonts as Fuentes } from "expo-font";
  import { useState, useRef } from "react";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import ListaMateriales from "./Componentes/ListaMateriales";

  
  const MaterialesTP = (props) => {
    const folio = props.route.params.folio;
    const lista = props.route.params.lista;
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
      <View style={styles.contenedorPrincipal}>
        <ListaMateriales folio={folio} tipoMaterial={2} lista={lista}></ListaMateriales>
      </View>
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
  });
  
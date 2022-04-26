import {
  StyleSheet,
  View,
} from "react-native";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import ListaMateriales from "./Componentes/ListaMateriales";

const Miscelaneos = (props) => {
  const folio = props.route.params.folio;
  
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
        <ListaMateriales folio={folio} tipoMaterial={1}></ListaMateriales>
    </View>
  );
};

export default Miscelaneos;

const styles = StyleSheet.create({
  contenedorPrincipal: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    // paddingTop: 20,
  },
});

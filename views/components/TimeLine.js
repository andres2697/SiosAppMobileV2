import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { LinearGradient } from "expo-linear-gradient";

const TimeLine = (props) => {
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
    return <AppLoading />;
  }

  return (
    <View style={{ width: "100%", marginBottom: "5%" }}>
      <View style={styles.timelineComponent}>
        <LinearGradient
          locations={[0.0, 0.8, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 0.7 }}
          colors={["rgba(191, 191, 191, 0.4)", "#fefefe", "#ffffff"]}
          style={styles.bordeIconos}
        >
          <Iconos name="confirmarLlegada" color={props.buble1} size={50}></Iconos>
        </LinearGradient>
        <View style={{ width: "21.5%", flexDirection: "row" }}>
          <View style={[styles.separador, {borderBottomColor: props.line1}]}></View>
        </View>
        <LinearGradient
          locations={[0.0, 0.8, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 0.7 }}
          colors={["rgba(191, 191, 191, 0.4)", "#fefefe", "#ffffff"]}
          style={styles.bordeIconos}
        >
          <Iconos name="horaLlegada" color={props.buble2} size={50}></Iconos>
        </LinearGradient>
        <View style={{ width: "21.5%", flexDirection: "row" }}>
          <View style={[styles.separador, {borderBottomColor: props.line2}]}></View>
        </View>
        <LinearGradient
          locations={[0.0, 0.8, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 0.7 }}
          colors={["rgba(191, 191, 191, 0.4)", "#fefefe", "#ffffff"]}
          style={styles.bordeIconos}
        >
          <Iconos name="horaCierre" color={props.buble3} size={50}></Iconos>
        </LinearGradient>
      </View>
      <View style={styles.textoIconos}>
        <View style={styles.contenedorTexto}>
          <View
            style={{
              width: "50%",
              alignItems: "center",
              alignSelf: "flex-start",
              marginLeft: "7%",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Hora de inicio
            </Text>
          </View>
        </View>
        <View style={styles.contenedorTexto}>
          <View
            style={{
              width: "50%",
              alignItems: "center",
              alignSelf: "flex-start",
              marginLeft: "8%",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Llegada a folio
            </Text>
          </View>
        </View>
        <View style={styles.contenedorTexto}>
          <View
            style={{
              width: "50%",
              alignItems: "center",
              alignSelf: "flex-start",
              marginLeft: "8%",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Hora de cierre
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TimeLine;

const styles = StyleSheet.create({
  timelineComponent: {
    flex: 2,
    width: "80%",
    height: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  separador: {
    borderBottomWidth: 3,
    width: "100%",
    height: "50%",
  },
  bordeIconos: {
    width: "19%",
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 8,
    borderRadius: 50,
    padding: "2%",
    textAlign: "center",
  },
  textoIconos: {
    width: "85%",
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
    marginTop: 15,
  },
  contenedorTexto: {
    width: "38%",
  },
});
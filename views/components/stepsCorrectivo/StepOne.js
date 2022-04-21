import {
  StyleSheet,
  AppState,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ToastAndroid,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { HelperText, TextInput as Paper } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { getDatabase, child, get, ref, limitToFirst } from 'firebase/database';

const StepOne = (props) => {
  const navigation = useNavigation();
  // var timerInicio = new Date();
  // const [dia, setDia] = useState(timerInicio.getDate());
  // const [mes, setMes] = useState(timerInicio.getMonth());
  // const [anio, setAnio] = useState(timerInicio.getFullYear());
  // const [hora, setHora] = useState(timerInicio.getHours());
  // const [minuto, setMinuto] = useState(timerInicio.getMinutes());

  // const _actualizarHorario = () => {
  //     console.log('Actualizando...');
  //     timerInicio = new Date();
  //     // setHorario(new Date());
  //     setDia(timerInicio.getDate());
  //     setMes(timerInicio.getMonth());
  //     setAnio(timerInicio.getFullYear());
  //     setHora(timerInicio.getHours());
  //     setMinuto(timerInicio.getMinutes());
  // }

  // setInterval(() => _actualizarHorario(), 5000);

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
    <View>
      <View style={{ width: "100%", marginTop: 15, marginBottom: 15, flex: 0 }}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={async () => {
            props.callback(-50, 0, ["#2166E5", "#2166E5","#2166E5", "#EDF2F9", "black"]);
          }}
        >
          <Text style={styles.buttonText}>Llegué a sitio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  button: {
    flex: 0,
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#2166E5",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    height: 45,
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
  },
});

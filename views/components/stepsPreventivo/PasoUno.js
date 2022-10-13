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
import {
  getDatabase,
  child,
  get,
  ref,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import moment, { min } from "moment";

import { getAuth } from "firebase/auth";
import InfoExtra from "../InfoExtra";
import TimeLine from "../TimeLine";
import Tiempos from "../Tiempos";
import StepOne from "../stepsCorrectivo/StepOne";

const PasoUno = (props) => {
  const navigation = useNavigation();
  const database = getDatabase();
  const auth = getAuth();
  const [infoData, setInfoData] = useState(props.infoData);
  const [burbuja1, setBurbuja1] = useState(props.burbuja1);
  const [burbuja2, setBurbuja2] = useState(props.burbuja2);
  const [burbuja3, setBurbuja3] = useState(props.burbuja3);
  const [linea1, setLinea1] = useState(props.linea1);
  const [linea2, setLinea2] = useState(props.linea2);
  // const [cargando, setCargando] = useState(false);
  // const folio = props.folio;
  // const tipoFolio = props.tipoFolio;

  //-----------------------------------------------------------------------------//
  //  Función de retorno para actualización de datos calculados                  //
  //  por la aplicación en el paso 2 (hora de llegada, eta, latitud y longitud). //
  //-----------------------------------------------------------------------------//

  
  const startAnimate = async (
    valorNuevo,
    valorNuevoE,
    tiempo,
    fechaSistemaInicio,
    horaSistemaInicio
  ) => {
    infoData.fechaLlegada = tiempo[0] + "/" + tiempo[1] + "/" + tiempo[2];
    infoData.horaLlegada = tiempo[3] + ":" + tiempo[4];
    infoData.latitud = "";
    infoData.longitud = "";

    console.log(fechaSistemaInicio + " " + horaSistemaInicio + ":00");
    console.log(tiempo[2] + "/" + tiempo[1] + "/" + tiempo[0] + " " + infoData.horaLlegada + ":00");
    let inicio = new Date(fechaSistemaInicio + " " + horaSistemaInicio + ":00");
    let llegada = new Date(
      tiempo[2] +
        "/" +
        tiempo[1] +
        "/" +
        tiempo[0] +
        " " +
        infoData.horaLlegada +
        ":00"
    );

    let diferencia = llegada.getTime() - inicio.getTime();
    let minutos = 0;
    console.log(diferencia);
    while (diferencia >= 60000) {
      minutos = minutos + 1;
      diferencia = diferencia - 60000;
    }
    infoData.eta.tiempo = minutos < 10 ? "0" + minutos.toString() : minutos.toString();
    infoData.eta.color = minutos > 30 ? "red" : "transparent";

    await update(
      child(
        ref(database),
        `folios/preventivos/${infoData.tipoFolio}/${infoData.folio}`
      ),
      {
        eta: {
          tiempo: infoData.eta.tiempo,
          color: infoData.eta.color
        },
      }
    ).then((snapshot) => {
      // console.log(infoData);
    });
    // setCargando(false);
    props.callback(infoData, 2);
  };

  useEffect(()=>{return ()=> {}},[infoData]);
  useEffect(()=>{return ()=> {}},[burbuja1]);
  useEffect(()=>{return ()=> {}},[burbuja2]);
  useEffect(()=>{return ()=> {}},[burbuja3]);
  useEffect(()=>{return ()=> {}},[linea1]);
  useEffect(()=>{return ()=> {}},[linea2]);

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
    <View style={{width: '100%'}}>
      <InfoExtra
        style={{ height: "auto" }}
        infoData={infoData}
      ></InfoExtra>
      <TimeLine
        buble1={burbuja1}
        buble2={burbuja2}
        buble3={burbuja3}
        line1={linea1}
        line2={linea2}
      ></TimeLine>
      <View style={{ paddingBottom: 5 }}>
        <Tiempos
          data="Hora de inicio"
          infoData={infoData}
        ></Tiempos>
        <StepOne
          callback={startAnimate.bind(this)}
          infoData={infoData}
          incidencia={1}
        ></StepOne>
      </View>
    </View>
  );
};

export default PasoUno;

const styles = StyleSheet.create({
  button: {
    flex: 0,
    width: "45%",
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
    textAlign: "center",
  },
});

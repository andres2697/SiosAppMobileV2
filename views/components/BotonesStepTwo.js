import {
  StyleSheet,
  AppState,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import { HelperText, TextInput as Paper, Button } from "react-native-paper";
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
} from "firebase/database";
import moment, { min } from "moment";

import { getAuth } from "firebase/auth";

const BotonesStepTwo = (props) => {
  const navigation = useNavigation();
  const db = getDatabase();
  const auth = getAuth();
  const [infoData, setInfoData] = useState(props.infoData);
  // const folio = props.folio;
  // const tipoFolio = props.tipoFolio;

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
    <View>
      <View style={{ width: "100%", marginTop: 15, marginBottom: 15, flex: 0 }}>
        <View style={{ width: "50%", marginBottom: 45, alignSelf: "center" }}>
          <Button
            mode="contained"
            color="#EDF2F9"
            uppercase={false}
            style={{ borderRadius: 50 }}
            onPress={() => {
              navigation.navigate("Observaciones", {
                folio: infoData.folio,
                tipoFolio: infoData.tipoFolio,
                incidencia: props.incidencia
              });
            }}
          >
            <Text style={{ fontSize: 17, fontFamily: "Urbanist_400Regular" }}>
              Observaciones
            </Text>
          </Button>
        </View>

        <View style={{ width: "40%", marginBottom: 20, alignSelf: "center" }}>
          <Button
            mode="contained"
            color="#2166E5"
            uppercase={false}
            style={{ borderRadius: 50, elevation: 5 }}
            onPress={async() => {
              // console.log("hola");
              let dia = new Date().getDate(serverTimestamp());
              let mes = new Date().getMonth(serverTimestamp()) + 1;
              let anio = new Date().getFullYear(serverTimestamp());
              
              let hora = new Date().getHours(serverTimestamp());
              let minuto = new Date().getMinutes(serverTimestamp());

              let fecha = (dia < 10 ?  '0' + dia.toString() : dia.toString()) + '/' + (mes < 10 ?  '0' + mes.toString() : mes.toString()) + '/' + anio.toString();
              let horario = (hora < 10 ?  '0' + hora.toString() : hora.toString()) + ':' + (minuto < 10 ?  '0' + minuto.toString() : minuto.toString());
              
              // set(child(ref(db), `folios/correctivos/${infoData.tipoFolio}/${infoData.folio}/estado`), 3);
              await set(child(ref(db), `folios/correctivos/${infoData.tipoFolio}/${infoData.folio}/horaActivacion`), {
                fecha: fecha,
                hora: horario
              });
            
              props.callback(
                -50, 0, 
                ["#2166E5", "#2166E5","#2166E5", "#2166E5", "#2166E5"],
              );
            }}
          >
            <Text style={{ fontSize: 17, fontFamily: "Urbanist_400Regular" }}>
              Terminé
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default BotonesStepTwo;

const styles = StyleSheet.create({});

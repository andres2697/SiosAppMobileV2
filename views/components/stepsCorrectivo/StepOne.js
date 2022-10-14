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
import { getDatabase, child, get, ref, serverTimestamp, set, update } from 'firebase/database';
import moment, { min } from 'moment'

import { getAuth } from 'firebase/auth';
import LottieView from 'lottie-react-native';

const StepOne = (props) => {
  const navigation = useNavigation();
  const db = getDatabase();
  const auth = getAuth();
  // const folio = props.folio;
  // const tipoFolio = props.tipoFolio;
  const [infoData, setInfoData] = useState(props.infoData);
  const [cargando, setCargando] = useState(false);
    // console.log(db.);
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
          disabled={cargando}
          style={[!cargando ? styles.button : styles.hideButton]}
          onPress={async () => {
            setCargando(true);
            let incidencia = props.incidencia == 1 ? 'preventivos' : 'correctivos';
            let ruta = `folios/${incidencia}/${infoData.tipoFolio}/${infoData.folio}`;
            let dia = new Date().getDate(serverTimestamp());
            let mes = new Date().getMonth(serverTimestamp()) + 1;
            let anio = new Date().getFullYear(serverTimestamp());
            
            let hora = new Date().getHours(serverTimestamp());
            let minuto = new Date().getMinutes(serverTimestamp());

            let fechaScript = (dia < 10 ?  '0' + dia.toString() : dia.toString()) + '/' + (mes < 10 ?  '0' + mes.toString() : mes.toString()) + '/' + anio.toString();
            let fechaSistema = anio.toString() + '/' + (mes < 10 ?  '0' + mes.toString() : mes.toString()) + '/' + (dia < 10 ?  '0' + dia.toString() : dia.toString());
            let horario = (hora < 10 ?  '0' + hora.toString() : hora.toString()) + ':' + (minuto < 10 ?  '0' + minuto.toString() : minuto.toString());

            update(child(ref(db), ruta), {
              estado: 2, 
              horaLlegada: {
                fechaScript: fechaScript,
                fechaSistema: fechaSistema,
                hora: horario
              },
              estatus: 2 
            });
            setCargando(false);
            props.callback(
                -50, 0, 
                [ dia < 10 ?  '0' + dia.toString() : dia.toString(), 
                  mes < 10 ?  '0' + mes.toString() : mes.toString(), 
                  anio.toString(), 
                  hora < 10 ?  '0' + hora.toString() : hora.toString(), 
                  minuto < 10 ?  '0' + minuto.toString() : minuto.toString()
                ],
                infoData.fechaInicioSistema,
                infoData.horaInicio
              );
          }}
        >
          {
              (()=>{
                if(cargando){
                  return(
                    <LottieView source={require('../../../assets/loader.json')} autoPlay loop></LottieView>
                  );
                }else{
                  return(
                    <Text style={styles.buttonText}>Llegué a sitio</Text>
                  );
                }
              })()
            }
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepOne;

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
  hideButton: {
    flex: 0,
    width: "50%",
    alignSelf: "center",
  //   justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    height: 60,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
    textAlign: "center"
  },
});

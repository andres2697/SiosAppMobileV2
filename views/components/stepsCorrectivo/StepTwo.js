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
import { useState, useEffect, memo } from "react";
import { HelperText, TextInput as Paper } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { getDatabase, child, get, ref, limitToFirst, update } from "firebase/database";
import { Skeleton } from "moti/skeleton";
import { MotiView } from 'moti';
import * as Location from 'expo-location';

const StepTwo = (props) => {
  const database = getDatabase();
  const navigation = useNavigation();
  const incidencia = props.incidencia == 1 ? 'preventivos' : 'correctivos';
  const [infoData, setInfoData] = useState(props.infoData);
  const [latitud, setLatitud] = useState(infoData.latitud === undefined ? null : infoData.latitud);
  const [longitud, setLongitud] = useState(infoData.longitud === undefined ? null : infoData.longitud);
  Location.setGoogleApiKey("AIzaSyCL6SrNElBbvIVhJtW3t_K4cn8OasyznsQ");

  function MySkeleton() {
    return(
            <Skeleton width={'100%'} height={45} colorMode={'light'}></Skeleton>
          );
  }

  const llenarCoordenadas = async() => {
    if(!latitud && !longitud){
      let arregloTemporal={
          latitud:'',
          longitud:'',
      };
      console.log('Estás llenando las coordenadas');
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
      }
      let location = await Location.getCurrentPositionAsync();
      arregloTemporal.latitud = location.coords.latitude.toString();
      arregloTemporal.longitud = location.coords.longitude.toString();
      let coordenadas = arregloTemporal.latitud + "," + arregloTemporal.longitud;
      await update(child(ref(database), `folios/${incidencia}/${infoData.tipoFolio}/${infoData.folio}`), {
          coordenada: coordenadas
      }).then((snapshot)=>{});
      setLatitud(arregloTemporal.latitud);
      setLongitud(arregloTemporal.longitud);
    }
  };

  useEffect(()=>{
    if(!latitud && !longitud){
      llenarCoordenadas();
    }
    return () => {

    }
  }, []);

  useEffect(()=>{
    setLatitud(latitud);
    if(longitud){
      props.callback(
        latitud, longitud
      );
    }
    return () => {

    }
  },[latitud]);

  useEffect(()=>{
    setLongitud(longitud);
    if(latitud){
      props.callback(
        latitud, longitud
      );
    }
    return () => {

    }
  },[longitud]);

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
      <View style={styles.contenedorAvance}>
        <View style={styles.row}>
          <View style={styles.contenedorInput}>
            <HelperText style={styles.helper}>Latitud</HelperText>
            {
                latitud ? 
                <TextInput
                  style={[styles.inputCustomizedInfo, { marginRight: "2%" }]}
                  underlineColor="transparent"
                  outlineColor="transparent"
                  activeOutlineColor="transparent"
                  selectionColor="transparent"
                  autoFocus={false}
                  onChangeText={() => {}}
                  value={latitud}
                  editable={false}
                  multiline={true}
                ></TextInput>
                : <MySkeleton></MySkeleton>
            }
          </View>
          <View style={styles.contenedorInput}>
            <HelperText style={styles.helper}>Longitud</HelperText>
            {
                longitud ? 
                  <TextInput
                    style={[styles.inputCustomizedInfo, { marginRight: "2%" }]}
                    underlineColor="transparent"
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    selectionColor="transparent"
                    autoFocus={false}
                    onChangeText={() => {}}
                    value={longitud}
                    editable={false}
                    multiline={true}
                  ></TextInput>
                : <MySkeleton></MySkeleton>
              }
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.contenedorInput}>
            <HelperText style={styles.helper}>ETA</HelperText>
            <TextInput
              style={
                [styles.inputCustomizedInfo, { marginRight: "2%" }, 
                {
                  borderColor: infoData.eta.color,
                  borderWidth: 1
                }]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              selectionColor="transparent"
              autoFocus={false}
              onChangeText={() => {}}
              value={infoData.eta.tiempo}
              editable={false}
              multiline={true}
            ></TextInput>
          </View>
          <View style={styles.contenedorInput}>
            <HelperText style={styles.helper}>SLA</HelperText>
            <TextInput
              style={[styles.inputCustomizedInfo, { marginRight: "2%" }, {borderColor: infoData.sla.color, borderWidth: 1}]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              selectionColor="transparent"
              autoFocus={false}
              onChangeText={() => {}}
              value={infoData.sla.tiempo}
              editable={false}
              multiline={true}
            ></TextInput>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  contenedorAvance: {
    width: "85%",
    marginTop: 10,
    marginBottom: 5,
    flex: 0,
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    paddingBottom: 6,
    width: "100%",
    // backgroundColor: 'red',
    justifyContent: "space-around",
  },
  contenedorInput: {
    flexDirection: "column",
    width: "42%",
  },
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
  inputCustomizedInfo: {
    height: 45,
    width: "100%",
    backgroundColor: "#EDF2F9",
    marginTop: "-10%",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 10,
    color: "black",
    textAlign: "center",
    // letterSpacing: 0.5
  },
  helper: {
    fontWeight: "bold",
    color: "black",
    fontSize: 11,
    zIndex: 999,
    elevation: 6
    // flex:10
  },
});

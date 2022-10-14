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
  import { getDatabase, child, get, ref, update } from 'firebase/database';
  import { getFunctions, httpsCallable } from "firebase/functions";
  import LottieView from 'lottie-react-native';
  
  const StepThree = (props) => {
    const navigation = useNavigation();
    const database = getDatabase();
    const functions = getFunctions();
    const [infoData, setInfoData] = useState(props.infoData);
    const [cargando, setCargando] = useState(false);
  
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
        <View style={{ width: "100%", marginTop: 40, marginBottom: 15, flex: 0 }}>
          <TouchableOpacity
            disabled={cargando}
            style={[!cargando ? styles.button : styles.hideButton]}
            onPress={async () => {
              setCargando(true);
              let incidencia = props.incidencia == 1 ? `preventivos` : `correctivos`;
              let ruta = `folios/${incidencia}/${infoData.tipoFolio}/${infoData.folio}`;
              await update(child(ref(database), `folios/correctivos/${infoData.tipoFolio}/${infoData.folio}`), {
                estatus: 4,
              }).then((snapshot)=>{
              });
              setCargando(false);
              props.callback();
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
                    <Text style={styles.buttonText}>Confirmar</Text>
                  );
                }
              })()
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default StepThree;
  
  const styles = StyleSheet.create({
    button: {
      flex: 0,
      width: "40%",
      alignSelf: "center",
    //   justifyContent: "center",
      alignItems: "center",
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
    },
  });
  
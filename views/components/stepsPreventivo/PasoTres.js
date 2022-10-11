import {
    StyleSheet,
    AppState,
    View,
  } from "react-native";
  import { useState, useEffect } from "react";
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
import Coordenadas from "../Coordenadas";
import StepThree from "../stepsCorrectivo/StepThree";
  
  const PasoTres = (props) => {
    const navigation = useNavigation();
    const database = getDatabase();
    const auth = getAuth();
    const [infoData, setInfoData] = useState(props.infoData);
    const [burbuja1, setBurbuja1] = useState(props.burbuja1);
    const [burbuja2, setBurbuja2] = useState(props.burbuja2);
    const [burbuja3, setBurbuja3] = useState(props.burbuja3);
    const [linea1, setLinea1] = useState(props.linea1);
    const [linea2, setLinea2] = useState(props.linea2);
    // const folio = props.folio;
    // const tipoFolio = props.tipoFolio;
    const regresar = () => {
      props.llamada(infoData, 4);
    }
  
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
        >
        </TimeLine>
        <View
          style={{
            alignContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Coordenadas
            infoData={infoData}
          ></Coordenadas>
        </View>
        <View style={{paddingBottom: 5}}>
          <Tiempos
            data="Hora de cierre"
            infoData={infoData}
          ></Tiempos>
          <StepThree
            infoData={infoData}
            tecnico={auth.currentUser.uid}
            callback={regresar.bind(this)}
            incidencia={1}
          ></StepThree>
        </View>
      </View>
    );
  };
  
  export default PasoTres;
  
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
  
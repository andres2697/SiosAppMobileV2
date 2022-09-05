import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ToastAndroid,
  Animated,
  // ScrollView,
} from "react-native";
import React, { Suspense } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { useState, useEffect, useCallback } from "react";
import { Button, HelperText, TextInput as Paper } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-root-toast";
import { useNavigation, useRoute } from "@react-navigation/native";
import Cabecera from "./components/Cabecera";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { getDatabase, child, get, ref, limitToFirst } from "firebase/database";
import { getAuth } from "firebase/auth";
import InfoExtra from "./components/InfoExtra";
import Timeline from "./components/TimeLine";
import Tiempos from "./components/Tiempos";
import StepOne from "./components/stepsCorrectivo/StepOne";
import StepTwo from "./components/stepsCorrectivo/StepTwo";
import StepThree from "./components/stepsCorrectivo/StepThree";
import Herramientas from "./components/Herramientas";
import MaterialesConcepto from "./components/MaterialesConcepto";
import BotonesStepTwo from "./components/BotonesStepTwo";

const Correctivo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [cargado, setCargado] = useState(false);
  // const navegacion = route.params.navigation;

  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [animationO, setAnimationE] = useState(new Animated.Value(1));
  const [animation2, setAnimation2] = useState(new Animated.Value(50));
  const [animationO2, setAnimationE2] = useState(new Animated.Value(0));
  const [animation3, setAnimation3] = useState(new Animated.Value(50));
  const [animationO3, setAnimationE3] = useState(new Animated.Value(0));

  const database = getDatabase();
  const auth = getAuth();

  const [folio, setFolio] = useState("");
  const [estado, setEstado] = useState(0);
  const [tipoFolio, setTipoFolio] = useState("");
  const [distrito, setDistrito] = useState("");
  const [cluster, setCluster] = useState("");
  const [falla, setFalla] = useState("");
  const [causa, setCausa] = useState("");
  const [clientesAfectados, setClientesAfectados] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [paso, setPaso] = useState(1);
  const [altura, setAltura] = useState("100%");
  const [altura2, setAltura2] = useState(0);
  const [altura3, setAltura3] = useState(0);
  const [burbuja1, setBurbuja1] = useState("#2166E5");
  const [burbuja2, setBurbuja2] = useState("black");
  const [burbuja3, setBurbuja3] = useState("black");
  const [linea1, setLinea1] = useState("#EDF2F9");
  const [linea2, setLinea2] = useState("#EDF2F9");

  const [tituloPagina, setTituloPagina] = useState("");

  const cargarInfoFolio = useCallback(async () => {
    let folioKey;
    let tipoFolio; 
    const folio = await get(child(ref(database), 
            `foliosAsignados/correctivos/activo/${auth.currentUser.uid}`
        ))
        .then((snapshot)=>{
            // console.log(snapshot.val());
            snapshot.forEach((folio)=>{
                // console.log(folio.key);
                tipoFolio = folio.key;
                folioKey = Object.keys(folio.val())[0];
            })
    });
    console.log(folioKey);
    console.log(tipoFolio);
    const variables = await get(
      child(
        ref(database),
        `folios/correctivos/${tipoFolio}/${folioKey}`,
        limitToFirst(1)
      )
    )
      .then((snapshot) => {
        // console.log(snapshot);
        snapshot.forEach((element) => {
          setFolio(element.key);
          setTipoFolio(tipoFolio);
          setDistrito(element.val()["distrito"]);
          setCluster(element.val()["cluster"]);
          setFalla(element.val()["falla"]);
          setCausa(element.val()["causa"]);
          setClientesAfectados(element.val()["clientesAfectados"]);
          // setFechaInicio(element.val()['horaInicio']['fecha']);
          // setHoraInicio(element.val()['horaInicio']['hora']);
          setEstado(element.val()["estado"]);
          setTituloPagina("Folio correctivo");
          // console.log(estado);
          if (element.val()["estado"] == 1) {
            // console.log(element.val()['horaLlegada']['fecha']);
            setFechaInicio(element.val()["horaInicio"]["fecha"]);
            setHoraInicio(element.val()["horaInicio"]["hora"]);
          } else if (element.val()["estado"] == 2) {
            setFechaInicio(element.val()["horaLlegada"]["fecha"]);
            setHoraInicio(element.val()["horaLlegada"]["hora"]);
            setBurbuja1("#2166E5");
            setLinea1("#2166E5");
            setBurbuja2("#2166E5");
            setLinea2("#EDF2F9");
            setBurbuja3("black");
            setAltura(0);
            setAltura3(0);
            Animated.parallel([
              Animated.timing(animation, {
                toValue: -50,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
              Animated.timing(animationO, {
                toValue: 0,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
              Animated.timing(animation2, {
                toValue: 0,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
              Animated.timing(animationO2, {
                toValue: 1,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
            ]).start();
            setAltura2("100%");
          } else if (element.val()["estado"] == 3) {
            setFechaInicio(element.val()["horaActivacion"]["fecha"]);
            setHoraInicio(element.val()["horaActivacion"]["hora"]);
            setBurbuja1("#2166E5");
            setLinea1("#2166E5");
            setBurbuja2("#2166E5");
            setLinea2("#EDF2F9");
            setBurbuja3("black");
            setAltura(0);
            setAltura2(0);
            Animated.parallel([
              Animated.timing(animation, {
                toValue: -50,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
              Animated.timing(animationO, {
                toValue: 0,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
              Animated.timing(animation2, {
                toValue: -50,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
              Animated.timing(animationO2, {
                toValue: 0,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
              Animated.timing(animation3, {
                toValue: 0,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
              Animated.timing(animationO3, {
                toValue: 1,
                duration: 0,
                // delay: 600,
                useNativeDriver: false,
              }),
            ]).start();
            setAltura3("100%");
          }
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  useEffect(() => {
    cargarInfoFolio();
  }, []);

  const startAnimate = (valorNuevo, valorNuevoE, colores, tiempo) => {
    setBurbuja1(colores[0]);
    setLinea1(colores[1]);
    setBurbuja2(colores[2]);
    setLinea2(colores[3]);
    setBurbuja3(colores[4]);
    Animated.parallel([
      Animated.timing(animation, {
        toValue: valorNuevo,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animationO, {
        toValue: valorNuevoE,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animation2, {
        toValue: 0,
        duration: 400,
        delay: 600,
        useNativeDriver: false,
      }),
      Animated.timing(animationO2, {
        toValue: 1,
        duration: 400,
        delay: 600,
        useNativeDriver: false,
      }),
    ]).start();
    setAltura(0);
    setAltura2("100%");
    setFechaInicio(tiempo[0] + "/" + tiempo[1] + "/" + tiempo[2]);
    setHoraInicio(tiempo[3] + ":" + tiempo[4]);
  };

  const startAnimate2 = (valorNuevo, valorNuevoE, colores) => {
    setBurbuja1(colores[0]);
    setLinea1(colores[1]);
    setBurbuja2(colores[2]);
    setLinea2(colores[3]);
    setBurbuja3(colores[4]);
    Animated.parallel([
      Animated.timing(animation2, {
        toValue: valorNuevo,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animationO2, {
        toValue: valorNuevoE,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animation3, {
        toValue: 0,
        duration: 400,
        delay: 600,
        useNativeDriver: false,
      }),
      Animated.timing(animationO3, {
        toValue: 1,
        duration: 400,
        delay: 600,
        useNativeDriver: false,
      }),
    ]).start();
    setAltura2(0);
    setAltura3("100%");
  };

  const Iconos = createIconSetFromIcoMoon(
    require("../icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  const [iconsLoaded] = Fuentes({
    IcoMoon: require("../icons/icomoon.ttf"),
  });
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
  });

  if (!iconsLoaded || !fontsLoaded) {
    // return
    // <View>
    return <AppLoading />;
  }

  if (!cargado) {
    setTimeout(function () {
      setCargado(true);
    }, 1200);
    clearTimeout();
    return (
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#ffffff",
          width: "100%",
          height: "100%",
        }}
      >
        <ActivityIndicator size="large" color="#2166E5" animating={!cargado} />
      </View>
    );
  } else {
    return (
      <View style={styles.contenedorPrincipal}>
        {/* <Cabecera navigation={navegacion}></Cabecera> */}
        <ScrollView>
          <InfoExtra
            style={{ height: "auto" }}
            folio={folio}
            tipoFolio={tipoFolio}
            distrito={distrito}
            cluster={cluster}
            falla={falla}
            causa={causa}
            clientesAfectados={clientesAfectados}
          ></InfoExtra>
          <Timeline
            buble1={burbuja1}
            buble2={burbuja2}
            buble3={burbuja3}
            line1={linea1}
            line2={linea2}
          ></Timeline>
          {/*Esta vista es de StepOne, cambiará de lugar con los siguientes pasos.*/}
          <View style={{ height: altura }}>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateX: animation,
                      // opacity: animationO
                    },
                  ],
                },
                { opacity: animationO },
              ]}
            >
              <Tiempos
                data="Hora de inicio"
                fechaInicio={fechaInicio}
                horaInicio={horaInicio}
              ></Tiempos>
              <View style={{ height: altura }}>
                <StepOne
                  callback={startAnimate.bind(this)}
                  folio={folio}
                ></StepOne>
              </View>
            </Animated.View>
          </View>
          {/*Esta vista es de StepTwo, cambiará de lugar con los siguientes pasos.*/}
          <View style={{ height: altura2 }}>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateX: animation2,
                      // opacity: animationO
                    },
                  ],
                },
                { opacity: animationO2 },
              ]}
            >
              <Tiempos
                data="Llegada al folio"
                fechaInicio={fechaInicio}
                horaInicio={horaInicio}
              ></Tiempos>
              <StepTwo
              // callback={startAnimate.bind(this)}
              ></StepTwo>
              <Herramientas folio={folio}></Herramientas>
              <MaterialesConcepto folio={folio}></MaterialesConcepto>
              <BotonesStepTwo
                callback={startAnimate2.bind(this)}
                folio={folio}
              ></BotonesStepTwo>
            </Animated.View>
          </View>

          <View style={{ height: altura3 }}>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateX: animation3,
                      // opacity: animationO
                    },
                  ],
                },
                { opacity: animationO3 },
              ]}
            >
              <Tiempos
                data="Hora de cierre"
                fechaInicio={fechaInicio}
                horaInicio={horaInicio}
              ></Tiempos>
              <StepThree></StepThree>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default Correctivo;

const styles = StyleSheet.create({
  contenedorPrincipal: {
    width: "100%",
    height: "100%",
    // fontFamily: 'Urbanist_400Regular',
    backgroundColor: "white",
    flex: 8,
  },
  contenedorTitulo: {
    width: "100%",
    paddingTop: "5%",
    width: "85%",
    // height: '',
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

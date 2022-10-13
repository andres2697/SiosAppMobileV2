import {
  StyleSheet,
  View,
  Text,
  Animated,
  Pressable,
  Image,
  Alert,
  Platform,
  TouchableOpacity
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
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";

import { getAuth } from "firebase/auth";
import InfoExtra from "../InfoExtra";
import TimeLine from "../TimeLine";
import Tiempos from "../Tiempos";
import StepOne from "../stepsCorrectivo/StepOne";
import Camara from "../Camara";
import StepTwo from "../stepsCorrectivo/StepTwo";
import Herramientas from "../Herramientas";
import MaterialesConcepto from "../MaterialesConcepto";
import BotonesStepTwo from "../BotonesStepTwo";
import * as ImagePicker from "expo-image-picker";

const PasoDos = (props) => {
  const navigation = useNavigation();
  const database = getDatabase();
  const auth = getAuth();
  const storage = getStorage();

  const [infoData, setInfoData] = useState(props.infoData);
  const [burbuja1, setBurbuja1] = useState(props.burbuja1);
  const [burbuja2, setBurbuja2] = useState(props.burbuja2);
  const [burbuja3, setBurbuja3] = useState(props.burbuja3);
  const [linea1, setLinea1] = useState(props.linea1);
  const [linea2, setLinea2] = useState(props.linea2);

  const [capturedPhotoAntes, setCapturedPhotoAntes] = useState(null);
  const [capturedPhotoDurante, setCapturedPhotoDurante] = useState(null);
  const [capturedPhotoDespues, setCapturedPhotoDespues] = useState(null);
  const [tomandoFotoAntes, setTomandoFotoAntes] = useState(false);
  const [tomandoFotoDurante, setTomandoFotoDurante] = useState(false);
  const [tomandoFotoDespues, setTomandoFotoDespues] = useState(false);
  
  const animatedO1 = new Animated.Value(1);
  const animatedO2 = new Animated.Value(1);
  const animatedO3 = new Animated.Value(1);
  const fadeIn = (boton) => {
    
    Animated.timing(boton == 1 ? animatedO1 : (boton == 2 ? animatedO2 : animatedO3), {
      toValue: 0.8,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = (boton) => {
    Animated.timing(boton == 1 ? animatedO1 : (boton == 2 ? animatedO2 : animatedO3), {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const showToast = (message) =>{
    let toast = Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: 110,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: '#BE0618',
        borderRadius: 30,
        fontSize: 30,
        textColor: 'white',
        fontWeight: 'bold',
    });
    setTimeout(function () {
        Toast.hide(toast);
    }, 2000);
    clearTimeout();
  }
  //--------------------------------------------------------------//
  //  Función de retorno para actualización de datos calculados   //
  //  por la aplicación en el paso 3 (hora de llegada y sla).     //
  //--------------------------------------------------------------//
  const startAnimate2 = async (valorNuevo, valorNuevoE, colores) => {
    if(infoData.latitud && infoData.longitud && capturedPhotoAntes && capturedPhotoDurante && capturedPhotoDespues){
      setBurbuja1(colores[0]);
      setLinea1(colores[1]);
      setBurbuja2(colores[2]);
      setLinea2(colores[3]);
      setBurbuja3(colores[4]);

      let activacion = {};
      let inicio = {};
      let tolerancia = 0;
      activacion = await obtenerHoraActivacion();
      inicio = await obtenerHoraInicio();
      tolerancia = await obtenerTolerancia();
      let diferencia = activacion.newDate.getTime() - inicio.newDate.getTime();
      let horas = 0;
      let minutos = 0;
      while (diferencia >= 60000) {
        if (diferencia >= 3600000) {
          horas = horas + 1;
          diferencia = diferencia - 3600000;
        } else {
          minutos = minutos + 1;
          diferencia = diferencia - 60000;
        }
      }
      infoData.sla.tiempo =
        (horas < 10 ? "0" + horas.toString() : horas.toString()) +
        ":" +
        (minutos < 10 ? "0" + minutos.toString() : minutos.toString());
      /** MODIFICAR LA FORMA DE OBTENCION DEL COLOR DEL BORDE EN calculo.color  **/
      infoData.sla.color =
        horas > 0 || minutos > tolerancia ? "red" : "transparent";
      await update(
        child(
          ref(database),
          `folios/preventivos/${infoData.tipoFolio}/${infoData.folio}`
        ),
        {
          sla: {
            tiempo: infoData.sla.tiempo,
            color: infoData.sla.color
          },
          estado: 3,
          estatus: 3,
          coordenada: infoData.latitud + ',' + infoData.longitud,
        }
      ).then((snapshot) => {});
      infoData.horaActivacion = activacion.hora;
      infoData.fechaActivacion = activacion.fechaScript;
      setInfoData(infoData);

      await actualizarFotoBD(capturedPhotoAntes, 'antes');
      await actualizarFotoBD(capturedPhotoDurante, 'durante');
      await actualizarFotoBD(capturedPhotoDespues, 'despues');

      await update(child(ref(database), `folios/preventivos/${infoData.tipoFolio}/${infoData.folio}/fotos`), {
        antes:{
          nombre: capturedPhotoAntes.uri.slice(capturedPhotoAntes.uri.lastIndexOf('/') + 1, capturedPhotoAntes.uri.length),
        },
        durante:{
          nombre: capturedPhotoDurante.uri.slice(capturedPhotoDurante.uri.lastIndexOf('/') + 1, capturedPhotoDurante.uri.length),
        },
        despues:{
          nombre: capturedPhotoDespues.uri.slice(capturedPhotoDespues.uri.lastIndexOf('/') + 1, capturedPhotoDespues.uri.length),
        }
      });
      // setEstado(3);
      props.callback(infoData, 3, burbuja1, burbuja2, burbuja3, linea1, linea2);
    }else{
      setTimeout(() => {
        showToast('Falta información por capturar.');
      }, 500); 
    }
  };
  const actualizarFotoBD = async(fotoASubir, tipoDeFoto) => {
    const blob = await new Promise((resolve, reject) => { 
      const xhr = new XMLHttpRequest(); 
      xhr.onload = function () { resolve(xhr.response); }; 
      xhr.onerror = function (e) { console.log(e); reject(new TypeError("Network request failed")); }; 
      xhr.responseType = "blob"; 
      xhr.open("GET", fotoASubir.uri, true); 
      xhr.send(null); 
    }); 
    let uri = fotoASubir.uri.slice(fotoASubir.uri.lastIndexOf('/') + 1, fotoASubir.uri.length);
    let referencia = `imagenes/preventivos/${tipoDeFoto}/${infoData.tipoFolio}/${infoData.folio}/${uri}`;
    await uploadBytes(refStorage(storage, referencia), blob); 
    blob.close();
  }  

  //  Funciones para los calculos de SLA
  //----------------------------------------------
  const obtenerHoraInicio = async () => {
    let fInicio = {};
    await get(
      child(
        ref(database),
        `folios/preventivos/${infoData.tipoFolio}/${infoData.folio}/horaInicio`
      )
    )
      .then((snapshot) => {
        snapshot.forEach((inicio) => {
          if (inicio.key == "fechaSistema") {
            fInicio.fecha = inicio.exportVal();
          } else if (inicio.key == "hora") {
            fInicio.hora = inicio.exportVal();
          }
        });
      })
      .catch(function (err) {});
    fInicio.newDate = new Date(fInicio.fecha + " " + fInicio.hora + ":00");
    // console.log(fInicio);
    return fInicio;
  };

  const obtenerHoraActivacion = async () => {
    let hora_cierre = {};
    let dia = new Date().getDate(serverTimestamp());
    let mes = new Date().getMonth(serverTimestamp()) + 1;
    let anio = new Date().getFullYear(serverTimestamp());

    let hora = new Date().getHours(serverTimestamp());
    let minuto = new Date().getMinutes(serverTimestamp());

    let fechaScript =
      (dia < 10 ? "0" + dia.toString() : dia.toString()) +
      "/" +
      (mes < 10 ? "0" + mes.toString() : mes.toString()) +
      "/" +
      anio.toString();
    let fechaSistema =
      anio.toString() +
      "/" +
      (mes < 10 ? "0" + mes.toString() : mes.toString()) +
      "/" +
      (dia < 10 ? "0" + dia.toString() : dia.toString());
    let horario =
      (hora < 10 ? "0" + hora.toString() : hora.toString()) +
      ":" +
      (minuto < 10 ? "0" + minuto.toString() : minuto.toString());

    update(
      child(
        ref(database),
        `folios/preventivos/${infoData.tipoFolio}/${infoData.folio}`
      ),
      {
        estado: 3,
        horaActivacion: {
          fechaScript: fechaScript,
          fechaSistema: fechaSistema,
          hora: horario,
        },
        estatus: 3,
      }
    );
    hora_cierre.fechaScript = fechaScript;
    hora_cierre.hora = horario;
    // setInfoData(infoData);
    hora_cierre.newDate = new Date(fechaSistema + " " + horario + ":00");
    return hora_cierre;
  };

  const obtenerTolerancia = async () => {
    let tiempoTolerancia = 0;
    await get(
      child(
        ref(database),
        `catalogo/tipoFolios/preventivo` + `/${infoData.tipoFolio}`
      )
    )
      .then((snapshot) => {
        snapshot.forEach((tiempoFolio) => {
          tiempoTolerancia = tiempoFolio.exportVal();
          // console.log(tiempoFolio.val());
        });
      })
      .catch(function (err) {});
    // console.log(tiempoTolerancia);
    return tiempoTolerancia;
  };

  //----------------------------------------------

  const llenarCoordenadas = (latitud, longitud) => {
    infoData.latitud = latitud;
    infoData.longitud = longitud;
    setInfoData(infoData);
  };

  const fotoTomadaAntes = (foto) => {
    setCapturedPhotoAntes(foto);
    setTomandoFotoAntes(false);
  };

  const fotoTomadaDurante = (foto) => {
    setCapturedPhotoDurante(foto);
    setTomandoFotoDurante(false);
    console.log(foto);
  };

  const fotoTomadaDespues = (foto) => {
    setCapturedPhotoDespues(foto);
    setTomandoFotoDespues(false);
    console.log(foto);
  };

  const pickImage = async (etapa) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      switch (etapa) {
        case 1:
          setCapturedPhotoAntes(result);
          break;
        case 2:
          setCapturedPhotoDurante(result);
          break;
        case 3:
          setCapturedPhotoDespues(result);
          break;
      }
    }
  };
  useEffect(()=>{return ()=> {}},[infoData]);
  useEffect(()=>{return ()=> {}},[burbuja1]);
  useEffect(()=>{return ()=> {}},[burbuja2]);
  useEffect(()=>{return ()=> {}},[burbuja3]);
  useEffect(()=>{return ()=> {}},[linea1]);
  useEffect(()=>{return ()=> {}},[linea2]);
  useEffect(()=>{return ()=> {}},[capturedPhotoAntes]);
  useEffect(()=>{return ()=> {}},[capturedPhotoDurante]);
  useEffect(()=>{return ()=> {}},[capturedPhotoDespues]);
  useEffect(()=>{return ()=> {}},[tomandoFotoAntes]);
  useEffect(()=>{return ()=> {}},[tomandoFotoDurante]);
  useEffect(()=>{return ()=> {}},[tomandoFotoDespues]);
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
    <View style={{ width: "100%" }}>
      {
        (() => {
          if (tomandoFotoAntes){
            return <Camara style={{width: '100%'}} callback={fotoTomadaAntes.bind(this)}></Camara>;
          } 
          else if(tomandoFotoDurante){
            return <Camara style={{width: '100%'}} callback={fotoTomadaDurante.bind(this)}></Camara>;
          }else if(tomandoFotoDespues) {
            return <Camara style={{width: '100%'}} callback={fotoTomadaDespues.bind(this)}></Camara>;
          }else{
            return <>
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
              <View style={{ marginBottom: 100 }}>
                <Tiempos
                  data="Llegada al folio"
                  infoData={infoData}
                ></Tiempos>
                <View
                  style={{
                    alignContent: "center",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <StepTwo
                    infoData={infoData}
                    estado={2}
                    callback={llenarCoordenadas.bind(this)}
                  ></StepTwo>
                </View>
                <View
                  style={{
                    width: "90%",
                    height: "auto",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignContent: "space-between",
                      justifyContent: "space-between",
                      marginTop: 20
                    }}
                  >
                    <View style={{width:'45%', height:'auto', }}>
                      <Text style={{textAlign: "center", fontWeight:'bold', fontSize:16, marginBottom: 10}}>Antes</Text>
                      <View
                        style={[
                          {
                            width: "100%",
                            height: 150,
                            backgroundColor: "rgba(217, 217, 217, 0.5)",
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {capturedPhotoAntes ? 
                          <Image
                            source={{ uri: capturedPhotoAntes.uri }}
                            style={{ width: "100%", height: 150, borderRadius: 10 }}
                          ></Image>
                        : 
                          <Pressable
                            style={styles.botonAgregar}
                            onPress={() => {
                              Alert.alert(
                                "Foto Antes",
                                "¿Cómo quiere subir la imágen?",
                                [
                                  {
                                    text: "Tomar desde cámara",
                                    onPress: () => setTomandoFotoAntes(true),
                                  },
                                  {
                                    text: "Agregar desde galería",
                                    onPress: () => pickImage(1),
                                  },
                                ],
                                {
                                  cancelable: true,
                                }
                              );
                            }}
                          >
                            <Text
                              style={styles.textBotonAgregar}
                            >
                              Agregar
                            </Text>
                          </Pressable>
                        }
                      </View>
                      {
                        !capturedPhotoAntes ? <></> :
                        <View style={{width: '100%', alignItems:"center", marginTop: 10}}>
                          <Pressable
                            onPressIn={()=>{fadeIn(1)}} onPressOut={()=>{fadeOut(1)}}
                            onPress={()=>{setCapturedPhotoAntes(null);}}
                          >
                            <Animated.View style={[styles.botonBorrarFoto, {opacity:animatedO1}]}>
                              <Iconos
                                style={{
                                  // backgroundColor: "#F67280",
                                  alignSelf: "center",
                                  borderRadius: 50,
                                  paddingRight: 3,
                                }}
                                name="borrar"
                                size={35}
                                color="black"
                              ></Iconos>
                              <Text style={{ fontSize: 17, fontFamily: "Urbanist_400Regular", textAlign:"center", paddingRight:10 }}>
                                Eliminar
                              </Text>
                            </Animated.View>
                          </Pressable>
                        </View>
                      }
                    </View>
                    <View style={{width:'45%', height:'auto', }}>
                      <Text style={{textAlign: "center", fontWeight:'bold', fontSize:16, marginBottom: 10}}>Durante</Text>
                      <View
                        style={[
                          {
                            width: "100%",
                            height: 150,
                            backgroundColor: "rgba(217, 217, 217, 0.5)",
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {capturedPhotoDurante ? (
                          <Image
                            source={{ uri: capturedPhotoDurante.uri }}
                            style={{ width: "100%", height: 150, borderRadius: 10 }}
                          ></Image>
                        ) : (
                          <Pressable
                            style={styles.botonAgregar}
                            onPress={() => {
                              Alert.alert(
                                "Foto Durante",
                                "¿Cómo quiere subir la imágen?",
                                [
                                  {
                                    text: "Tomar desde cámara",
                                    onPress: () => setTomandoFotoDurante(true),
                                  },
                                  {
                                    text: "Agregar desde galería",
                                    onPress: () => pickImage(2),
                                  },
                                ],
                                {
                                  cancelable: true,
                                }
                              );
                            }}
                          >
                            <Text
                              style={styles.textBotonAgregar}
                            >
                              Agregar
                            </Text>
                          </Pressable>
                        )}
                      </View>
                      {
                        !capturedPhotoDurante ? <></> :
                        <View style={{width: '100%', alignItems:"center", marginTop: 10}}>
                          <Pressable
                            onPressIn={()=>{fadeIn(2)}} onPressOut={()=>{fadeOut(2)}}
                            onPress={()=>{setCapturedPhotoDurante(null);}}
                          >
                            <Animated.View style={[styles.botonBorrarFoto, {opacity:animatedO2}]}>
                              <Iconos
                                style={{
                                  alignSelf: "center",
                                  borderRadius: 50,
                                  paddingRight: 3,
                                }}
                                name="borrar"
                                size={35}
                                color="black"
                              ></Iconos>
                              <Text style={{ fontSize: 17, fontFamily: "Urbanist_400Regular", textAlign:"center", paddingRight:10 }}>
                                Eliminar
                              </Text>
                            </Animated.View>
                          </Pressable>
                        </View>
                      }
                    </View>
                  </View>
                </View>
                <Herramientas
                  folio={infoData.folio}
                  tipoFolio={infoData.tipoFolio}
                ></Herramientas>
                <View style={{width:'100%', height:'auto', alignContent:"center", alignItems:"center", marginBottom:8, marginTop:15}}>
                  <Text style={{textAlign: "center", fontWeight:'bold', fontSize:16, marginBottom: 10}}>Después</Text>
                  <View
                    style={[
                      {
                        width: "45%",
                        height: 150,
                        backgroundColor: "rgba(217, 217, 217, 0.5)",
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    {capturedPhotoDespues ? 
                      <Image
                        source={{ uri: capturedPhotoDespues.uri }}
                        style={{ width: "100%", height: 150, borderRadius: 10 }}
                      ></Image>
                    : 
                      <Pressable
                        style={styles.botonAgregar}
                        onPress={() => {
                          Alert.alert(
                            "Foto Después",
                            "¿Cómo quiere subir la imágen?",
                            [
                              {
                                text: "Tomar desde cámara",
                                onPress: () => setTomandoFotoDespues(true),
                              },
                              {
                                text: "Agregar desde galería",
                                onPress: () => pickImage(3),
                              },
                            ],
                            {
                              cancelable: true,
                            }
                          );
                        }}
                      >
                        <Text
                          style={styles.textBotonAgregar}
                        >
                          Agregar
                        </Text>
                      </Pressable>
                    }
                  </View>
                  {
                    !capturedPhotoDespues ? <></> :
                    <View style={{width: '100%', alignItems:"center", marginTop: 10}}>
                      <Pressable
                        onPressIn={()=>{fadeIn(3)}} onPressOut={()=>{fadeOut(3)}}
                        onPress={()=>{setCapturedPhotoDespues(null);}}
                      >
                        <Animated.View style={[styles.botonBorrarFoto, {opacity:animatedO3}]}>
                          <Iconos
                            style={{
                              // backgroundColor: "#F67280",
                              alignSelf: "center",
                              borderRadius: 50,
                              paddingRight: 3,
                            }}
                            name="borrar"
                            size={35}
                            color="black"
                          ></Iconos>
                          <Text style={{ fontSize: 17, fontFamily: "Urbanist_400Regular", textAlign:"center", paddingRight:10 }}>
                            Eliminar
                          </Text>
                        </Animated.View>
                      </Pressable>
                    </View>
                  }
                </View>
                <MaterialesConcepto
                  folio={infoData.folio}
                  tipoFolio={infoData.tipoFolio}
                  incidencia={1}
                ></MaterialesConcepto>
                <BotonesStepTwo
                  callback={startAnimate2.bind(this)}
                  infoData={infoData}
                  incidencia={1}
                ></BotonesStepTwo>
              </View>
            </>;
          } 
        })()
      }
    </View>
  );
};

export default PasoDos;

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
  botonAgregar: {
    width: 120,
    height: 50,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowOpacity:0.1,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    elevation: 19
  },
  textBotonAgregar: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
  },
  botonBorrarFoto: {
    flexDirection:"row", 
    alignItems:"center", 
    backgroundColor:'#EDF2F9', 
    padding:6, 
    borderRadius:20,
    elevation: 3, // Android
  }
});

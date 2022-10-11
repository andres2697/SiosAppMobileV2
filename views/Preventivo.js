import { 
  StyleSheet, 
  View, 
  ActivityIndicator, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  SafeAreaView, 
  RefreshControl,
  Pressable, 
} from "react-native";
import React, { Suspense } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { useState, useEffect, useCallback, useRef } from "react";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {
  useNavigation,
  useRoute,
  CommonActions,
} from "@react-navigation/native";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import {
  getDatabase,
  child,
  get,
  ref,
  limitToFirst,
  set,
  update,
  serverTimestamp,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import InfoExtra from "./components/InfoExtra";
import Timeline from "./components/TimeLine";
import Tiempos from "./components/Tiempos";
import StepThree from "./components/stepsCorrectivo/StepThree";
import Coordenadas from "./components/Coordenadas";
import * as Location from "expo-location";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

import InfoExtraEstatico from "./components/InfoExtraEstatico";
import PasoUno from "./components/stepsPreventivo/PasoUno";
import PasoDos from "./components/stepsPreventivo/PasoDos";
import PasoTres from "./components/stepsPreventivo/PasoTres";

const Spacer = ({ height = 30 }) => <MotiView style={{ height }} />;

const Preventivo = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [cargado, setCargado] = useState(false);
  // const [mounted, setMounted] = useState(false);
  const mounted = useRef(false);
  Location.setGoogleApiKey("AIzaSyCL6SrNElBbvIVhJtW3t_K4cn8OasyznsQ");

  const database = getDatabase();
  const auth = getAuth();
  const functions = getFunctions();

  const [infoData, setInfoData] = useState({}); //  Inicialización del objeto de control para almacenamiento de información.
  const [listaFolios, setListaFolios] = useState([]);
  const [estado, setEstado] = useState(null);
  const [componente, setComponente] = useState(<></>);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [burbuja1, setBurbuja1] = useState("#2166E5");
  const [burbuja2, setBurbuja2] = useState("black");
  const [burbuja3, setBurbuja3] = useState("black");
  const [linea1, setLinea1] = useState("#EDF2F9");
  const [linea2, setLinea2] = useState("#EDF2F9");

  const [tituloPagina, setTituloPagina] = useState("");

  const manejarFolioCloud = httpsCallable(functions, "manejarFolio");
  const asignarFolioCloud = httpsCallable(functions, "colaFoliosPreventivos");

  function MySkeleton() {
    return (
      <MotiView
        animate={{ backgroundColor: 'white' }}
        transition={{
          type: 'timing',
        }}
        style={{
          width: "90%",
          height: "100%",
          marginTop: 20,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Spacer />
        <View style={{ width: "100%", height: "auto", flexDirection: "row" }}>
          <Skeleton width={"75%"} height={45} colorMode={"light"}></Skeleton>
          <Skeleton width={70} height={45} colorMode={"light"} radius={25}></Skeleton>
        </View>
        <Spacer />
        <View style={{ width: "100%", height: "auto", flexDirection: "row" }}>
          <Skeleton width={"75%"} height={45} colorMode={"light"}></Skeleton>
          <Skeleton width={70} height={45} colorMode={"light"} radius={25}></Skeleton>
        </View>
        <Spacer />
        <View style={{ width: "100%", height: "auto", flexDirection: "row" }}>
          <Skeleton width={"75%"} height={45} colorMode={"light"}></Skeleton>
          <Skeleton width={70} height={45} colorMode={"light"} radius={25}></Skeleton>
        </View>
        <Spacer />
        <View style={{ width: "100%", height: "auto", flexDirection: "row" }}>
          <Skeleton width={"75%"} height={45} colorMode={"light"}></Skeleton>
          <Skeleton width={70} height={45} colorMode={"light"} radius={25}></Skeleton>
        </View>
        <Spacer />
        <View style={{ width: "100%", height: "auto", flexDirection: "row" }}>
          <Skeleton width={"75%"} height={45} colorMode={"light"}></Skeleton>
          <Skeleton width={70} height={45} colorMode={"light"} radius={25}></Skeleton>
        </View>
        <Spacer />
        <View style={{ width: "100%", height: "auto", flexDirection: "row" }}>
          <Skeleton width={"75%"} height={45} colorMode={"light"}></Skeleton>
          <Skeleton width={70} height={45} colorMode={"light"} radius={25}></Skeleton>
        </View>
        <Spacer />
        <Skeleton width={"60%"} height={45} colorMode={"light"}></Skeleton>
      </MotiView>
    );
  }

  const pullingView = async() => {
    setRefresh(true);
    let listaTemporal = await recargarLista();
    // console.log(listaTemporal);
    // setListaFolios(listaTemporal)
    setTimeout(function () {
      setEstado(5);
      listaTemporal.forEach((element)=>{
        listaFolios.push({folio: element.folio, tipoFolio: element.tipoFolio});
      }); 
      setRefresh(false);
      setEstado(0);
    }, 100);
    clearTimeout();
  };

  const recargarLista = async() => {
    let ruta = {
      pendientes: `foliosAsignados/preventivos/pendientes/${auth.currentUser.uid}`,
    };
    let listaTemporal = new Array();
    await get(child(ref(database), ruta.pendientes))
    .then((snapshotListaPendientes) => {
      if(snapshotListaPendientes.exists()){
        let folios;
        snapshotListaPendientes.forEach((folioPendiente) => {
          folios = Object.keys(folioPendiente.val());
          folios.forEach((folioIndividual)=>{
              listaTemporal.push({folio: folioIndividual, tipoFolio: folioPendiente.key});
          });
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
    while(listaFolios.length != 0){
      listaFolios.pop();
    }
    return listaTemporal;
  }

  const actualizarInfoPaso1 = (info, paso) => {
    setBurbuja1('#2166E5');
    setLinea1('#2166E5');
    setBurbuja2('#2166E5');
    setLinea2('#EDF2F9');
    setBurbuja3('black');
    setInfoData(info);
    setEstado(paso);
  }

  const actualizarInfoPaso2 = (info, paso) => {
    setBurbuja1('#2166E5');
    setLinea1('#2166E5');
    setBurbuja2('#2166E5');
    setLinea2('#2166E5');
    setBurbuja3('#2166E5');
    setEstado(paso);
    setInfoData(info);
  }
  const actualizarInfoPaso3 = (info, paso) => {
    setInfoData(info);
    setEstado(paso);
    console.log(estado);
  }
  //----------------------------------------------

  const redireccionar = async () => {
    setTituloPagina('');
    await manejarFolioCloud({
      folio: infoData.folio,
      tipoFolio: infoData.tipoFolio,
      tecnico: auth.currentUser.uid,
      incidencia: 1,
    })
      .then((result) => {
        mounted.current = false;
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: "Dashboard",
                params: {},
              },
            ],
          })
        );
      })
      .catch((error) => {
        console.log(error.code, error.message, error.details);
        console.log(`Error: ${error}`);
      });
  };



  //--------------------------------------------------------------//
  //  Función encargada de almacenar en el objeto 'infoData' la   //
  //  información del folio seleccionado en la Flatlist desde la  //
  //  base de datos.                                              //
  //--------------------------------------------------------------//

  const cargarFolios = async () => {
    let rutas = {
      pendientes: `foliosAsignados/preventivos/pendientes/${auth.currentUser.uid}`,
      activo: `foliosAsignados/preventivos/activo/${auth.currentUser.uid}`,
    };
    infoData.eta = {
      tiempo: '--:--',
      color: 'transparent'
    };
    infoData.sla = {
        tiempo: '--:--',
        color: 'transparent'

    };
    let ruta;
    let coordenada;
    setTituloPagina("Folio preventivo");
    // setComponente(<MySkeleton></MySkeleton>);
    await get(child(ref(database), rutas.activo))
    .then(async(snapshot)=>{
      if(snapshot.exists()){
        let llave;
        let tipoFolioLlave;
        let edo;
        snapshot.forEach((folioActivo)=>{
            llave =  Object.keys(folioActivo.val())[0];
            tipoFolioLlave = folioActivo.key;
        });
        infoData.folio = llave;
        infoData.tipoFolio = tipoFolioLlave;
        ruta = `folios/preventivos/${infoData.tipoFolio}/${infoData.folio}`;
        await get(
            child(
            ref(database),
            ruta
            )
        )
        .then((snapshot) => {
          snapshot.forEach((element) => {
              switch(element.key){
                  case 'distrito':   
                      infoData.distrito = element.val();
                  break;
                  case 'cluster': 
                      infoData.cluster = element.val();
                  break;
                  case 'falla': 
                      infoData.falla = element.val();
                  break;
                  case 'causa': 
                      infoData.causa = element.val();
                  break;
                  case 'clientesAfectados': 
                      infoData.clientesAfectados = element.val();
                  break;
                  case 'estado':
                      edo = element.val();  
                      if (element.val() == 2) {
                          setBurbuja1("#2166E5");
                          setLinea1("#2166E5");
                          setBurbuja2("#2166E5");
                          setLinea2("#EDF2F9");
                          setBurbuja3("black");
                      } else if (element.val() == 3) {
                          setBurbuja1("#2166E5");
                          setLinea1("#2166E5");
                          setBurbuja2("#2166E5");
                          setLinea2("#2166E5");
                          setBurbuja3("#2166E5");
                      }
                  break;
                  case 'horaInicio':
                    infoData.fechaInicio = element.val()["fechaScript"];
                    infoData.horaInicio = element.val()["hora"];
                  break;
                  case 'horaLlegada':
                    infoData.fechaLlegada = element.val()["fechaScript"];
                    infoData.horaLlegada = element.val()["hora"];
                  break;
                  case 'horaActivacion':
                    infoData.fechaActivacion = element.val()["fechaScript"];
                    infoData.horaActivacion = element.val()["hora"];
                  break;
                  case 'olt': 
                    infoData.olt = element.val();
                  break;
                  case 'sla':
                    infoData.sla.tiempo = element.val()["tiempo"];
                    infoData.sla.color = element.val()["color"];
                  break;
                  case 'eta': 
                  infoData.eta.tiempo = element.val()["tiempo"];
                  infoData.eta.color = element.val()["color"];
                  break;
                  case 'coordenada': 
                  coordenada = element.val().split(',');
                  infoData.latitud = coordenada[0];
                  infoData.longitud = coordenada[1];
                  console.log(coordenada);
                  break;
              }
              setTituloPagina("Folio preventivo");
              setEstado(edo);
              // setInfoData(infoData);
          });
        })
        .catch(function (err) {
            console.log(err);
        });
        setInfoData(infoData);
        setEstado(edo);
      }else{
        await get(child(ref(database), rutas.pendientes))
        .then((snapshotListaPendientes) => {
          if(snapshotListaPendientes){
            let folios;
            snapshotListaPendientes.forEach((foliosPendientes) => {
              folios = Object.keys(foliosPendientes.val());
              folios.forEach((folioIndividual)=>{
                listaFolios.push({folio: folioIndividual, tipoFolio: foliosPendientes.key});
              })
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        });
        setEstado(0);
      }
    });
    
  };


  //--------------------   INICIO DE HOOKS   ---------------------//

  //-----------------------------------------------------------//
  //  Hook encargado de llamar a la función de carga de
  //  información desde base de datos //
  //-----------------------------------------------------------//
  useEffect(() => {
    // cargarInfo();
    cargarFolios();
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  //------------------------
  //
  useEffect(() => {
    return () => {};
  });
  //------------------------

  useEffect(()=>{
    // setRefresh(false);
    return () => {
      setListaFolios([]);
    }
  }, [listaFolios]);

  useEffect(()=>{
    // if(refresh){
    //   recargarLista();
    // }
    return () => {
      setRefresh(false);
    }
  }, [refresh]);


  //--------------------------------------------------------------//
  //  Hook encargado de escuchar cambios en la propiedad 'estado' //
  //  del objeto 'infoData' para renderizar los componentes       //
  //--------------------------------------------------------------//
  useEffect(() => {
    if(estado == 4){
      redireccionar();
    }
    return () => {};
  }, [estado]);

  useEffect(() => {
    return () => {};
  }, [componente]);

  useEffect(() => {
    return () => {};
  }, [infoData]);


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
    return <AppLoading />;
  }

  if (!cargado) {
    setTimeout(function () {
      setCargado(true);
    }, 500);
    clearTimeout();
    return (
      <View style={styles.contenedorPrincipal}>
        <View style={styles.contenedorTitulo}>
          <Text style={styles.titulo}>{tituloPagina}</Text>
        </View>
        <MySkeleton></MySkeleton>
      </View>
    );
  } else {
    if (mounted.current) {
      return (
        <View style={styles.contenedorPrincipal}>
            <View style={[styles.contenedorTitulo, {width:'100%', marginBottom:20}]}>
              <View style={{width:'100%', marginTop:2, marginLeft:10}}>
                <Text style={styles.titulo}>{tituloPagina}</Text>
              </View>
            </View>
            {
              (()=>{
                if(estado == 0){
                  return(
                    <>
                      <ScrollView 
                        refreshControl={
                          <RefreshControl
                            refreshing={refresh}
                            onRefresh={()=>pullingView()}
                          />
                      }
                      >
                        <View style={{ width: '100%', height:'auto', flexDirection:'column', marginBottom: 15, justifyContent:"center", paddingLeft:10 }}>
                          {
                            listaFolios.map((folio) => (
                              <View key={folio.folio} style={{ width: '100%', height:'auto', flexDirection:'row', marginBottom: 15, justifyContent:"center", paddingLeft:10 }}>
                                <View style={{width:'40%', justifyContent:"center"}}>
                                  <Text style={{fontSize: 16, fontWeight: '600'}}> {folio.folio} </Text>
                                </View>
                                <View style={{ width: '50%', alignSelf:"center", height: 50, paddingLeft:10 }}>
                                  <Pressable
                                    style={styles.button}
                                    onPress={async()=> {
                                      await get(child(
                                        ref(database),
                                        `folios/preventivos/${folio.tipoFolio}/${folio.folio}`
                                      ))
                                      .then((snapshot) => {
                                        // console.log(snapshot);
                                        if(infoData.folio != folio.folio){
                                          infoData.folio = folio.folio;
                                          infoData.tipoFolio = folio.tipoFolio;
                                          snapshot.forEach((folioPresionado) => {
                                            switch (folioPresionado.key) {
                                              case "distrito":
                                                infoData.distrito = folioPresionado.val();
                                                break;
                                              case "cluster":
                                                infoData.cluster = folioPresionado.val();
                                                break;
                                              case "falla":
                                                infoData.falla = folioPresionado.val();
                                                break;
                                              case "causa":
                                                infoData.causa = folioPresionado.val();
                                                break;
                                              case "clientesAfectados":
                                                infoData.clientesAfectados = folioPresionado.val();
                                                break;
                                            }
                                          });
                                          setInfoData(infoData);
                                        }
                                        setModalVisible(true);
                                      });
                                    }}
                                  >
                                    <Text style={[styles.buttonText]}>Ver</Text>
                                  </Pressable>
                                </View>
                              </View>
                            ))
                          }
                        </View>
                      </ScrollView>
                      <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                          setModalVisible(false);
                        }}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <InfoExtraEstatico
                              style={{ height: "auto" }}
                              infoData={infoData}
                            ></InfoExtraEstatico>
                            <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:40}}>
                              <TouchableOpacity
                                style={[styles.buttonClose]}
                                onPress={()=>{setModalVisible(!modalVisible)}}
                                keyboardShouldPersistTaps='always'
                              >
                                <Text style={styles.buttonCloseText}>Cerrar</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                              style={[styles.button]}
                              onPress={async()=>{
                                infoData.eta = {
                                  tiempo: "--:--",
                                  color: "transparent",
                                };
                                infoData.sla = {
                                  tiempo: "--:--",
                                  color: "transparent",
                                };
                                let dia = new Date().getDate(serverTimestamp());
                                let mes = new Date().getMonth(serverTimestamp()) + 1;
                                let anio = new Date().getFullYear(serverTimestamp());
                                
                                let hora = new Date().getHours(serverTimestamp());
                                let minuto = new Date().getMinutes(serverTimestamp());
        
                                let fechaScript = (dia < 10 ?  '0' + dia.toString() : dia.toString()) + '/' + (mes < 10 ?  '0' + mes.toString() : mes.toString()) + '/' + anio.toString();
                                let fechaSistema = anio.toString() + '/' + (mes < 10 ?  '0' + mes.toString() : mes.toString()) + '/' + (dia < 10 ?  '0' + dia.toString() : dia.toString());
                                let horario = (hora < 10 ?  '0' + hora.toString() : hora.toString()) + ':' + (minuto < 10 ?  '0' + minuto.toString() : minuto.toString());
        
                                await update(child(ref(database), `folios/preventivos/${infoData.tipoFolio}/${infoData.folio}`), {
                                  estado: 1, 
                                  horaInicio: {
                                    fechaScript: fechaScript,
                                    fechaSistema: fechaSistema,
                                    hora: horario
                                  },
                                  estatus: 1 
                                });
                                await asignarFolioCloud({
                                  folio: infoData.folio,
                                  tecnico: auth.currentUser.uid,
                                  estado: 1,
                                  estatus: 1,
                                  incidencia: 1,
                                  tipoFolio: infoData.tipoFolio,
                                  desplazar: true
                                })
                                .catch((error) => {
                                  console.log(error.code, error.message, error.details);
                                  console.log(`Error: ${error}`);
                                });
                                infoData.horaInicio = fechaScript;
                                infoData.fechaInicio = horario;
                                setInfoData(infoData);
                                // mounted.current = false;
                                setModalVisible(false);
                                setListaFolios([]);
                                setEstado(1);
                              }}
                              keyboardShouldPersistTaps='always'
                            >
                              <Text style={styles.buttonText}>Iniciar</Text>
                            </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    </>
                  );
                }else if(estado == 1){
                  return(
                    <ScrollView>
                      <PasoUno 
                      infoData={infoData}
                      burbuja1={burbuja1}
                      burbuja2={burbuja2}
                      burbuja3={burbuja3}
                      linea1={linea1}
                      linea2={linea2}
                      callback={actualizarInfoPaso1.bind(this)}
                      ></PasoUno>
                    </ScrollView>
                  )
                }else if(estado == 2){
                  return(
                    <ScrollView>
                      <PasoDos
                        infoData={infoData}
                        burbuja1={burbuja1}
                        burbuja2={burbuja2}
                        burbuja3={burbuja3}
                        linea1={linea1}
                        linea2={linea2}
                        callback={actualizarInfoPaso2.bind(this)}
                      ></PasoDos>
                    </ScrollView>
                  );
                }else if(estado == 3){
                  return(
                    <ScrollView>
                      <PasoTres
                        infoData={infoData}
                        burbuja1={burbuja1}
                        burbuja2={burbuja2}
                        burbuja3={burbuja3}
                        linea1={linea1}
                        linea2={linea2}
                        llamada={actualizarInfoPaso3.bind(this)}
                      ></PasoTres>
                    </ScrollView>
                  );
                }else if(estado == 4){
                  return(
                    <View style={{width: '100%', height:'100%', backgroundColor:'#ffffff', alignContent:"center", alignItems:"center", marginTop:'100%'}}>
                      <ActivityIndicator size="large" color="#2166E5" style={{alignSelf:"center"}}></ActivityIndicator>
                    </View>
                  );
                }else{
                  return(<View></View>);
                }
              })()
            }
        </View>
      );
    }else{
      return(
        <View style={styles.vistaSkeleton}>
          {/* <ActivityIndicator size="large" color="#2166E5" style={{alignSelf:"center", marginTop:'100%'}}></ActivityIndicator> */}
          <MySkeleton></MySkeleton>
        </View>
      )
    }
  }
};

export default Preventivo;

const styles = StyleSheet.create({
  contenedorPrincipal: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    // flexDirection: "row"
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
    marginLeft: 15
  },
  button: {
    flex: 0,
    width: "40%",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#2166E5",
    marginLeft: 20,
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
    fontSize: 15,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  buttonClose: {
    flex: 0,
    width: "40%",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    height: 45,
    elevation: 6,
  },
  buttonCloseText: {
    color: "black",
    fontSize: 15,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  modalView: {
    // top: '100%',
    width: '95%',
    height: 490,
    backgroundColor: 'whitesmoke',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 35,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 10,
  },
  centeredView: {
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 9,
    top:'40%'
  },
  vistaSkeleton: {
    width: '90%', 
    height:'100%', 
    backgroundColor:'#ffffff', 
    alignContent:"center", 
    alignItems:"center", 
    justifyContent:"center"
  }
});

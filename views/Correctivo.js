import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  RefreshControl
} from "react-native";
import React, { Suspense } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { useState, useEffect, useCallback, useRef } from "react";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";

import { getDatabase, child, get, ref, limitToFirst, set, update, serverTimestamp } from "firebase/database";
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
import Coordenadas from "./components/Coordenadas";

import * as Location from 'expo-location';
import { getFunctions, httpsCallable } from "firebase/functions";

import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

const Spacer = ({ height = 30 }) => <MotiView style={{ height }} />;

const Correctivo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [cargado, setCargado] = useState(false);
  const mounted = useRef(false);
  Location.setGoogleApiKey("AIzaSyCL6SrNElBbvIVhJtW3t_K4cn8OasyznsQ");

  const database = getDatabase();
  const auth = getAuth();
  const functions = getFunctions();

  const [infoData, setInfoData] = useState({});  //  Inicialización del objeto de control para almacenamiento de información.
  const [estado, setEstado] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const [componente, setComponente] = useState(<></>);
  
  const [burbuja1, setBurbuja1] = useState("#2166E5");
  const [burbuja2, setBurbuja2] = useState("black");
  const [burbuja3, setBurbuja3] = useState("black");
  const [linea1, setLinea1] = useState("#EDF2F9");
  const [linea2, setLinea2] = useState("#EDF2F9");

  const [tituloPagina, setTituloPagina] = useState("");

  const manejarFolioCloud = httpsCallable(functions, "manejarFolio");
  
  function MySkeleton() {
    return (
      <MotiView
        animate={{ backgroundColor: 'white' }}
        transition={{
          type: 'timing',
        }}
        style={{
          width: "100%",
          height: "100%",
          marginTop: 10,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Spacer />
        <View style={{ width: "100%", height: "auto", alignSelf:"center", alignContent:"center", alignItems: "center", justifyContent:"center" }}>
          <Skeleton width={"85%"} height={45} colorMode={"light"}></Skeleton>
        </View>
        <Spacer />
        <View style={{ width: "90%", height: "auto", flexDirection: "row", marginTop:20, alignContent:"center", justifyContent:'space-between' }}>
          <Skeleton width={80} height={80} radius={100} colorMode={"light"}></Skeleton>
          <Skeleton width={80} height={80} radius={100} colorMode={"light"}></Skeleton>
          <Skeleton width={80} height={80} radius={100} colorMode={"light"}></Skeleton>
        </View>
        <Spacer />
        <View style={{ width: "100%", height: "auto", alignSelf:"center", alignContent:"center", alignItems: "center", justifyContent:"center" }}>
          <Skeleton width={"85%"} height={45} colorMode={"light"}></Skeleton>
        </View>
        <Spacer />
        <Skeleton width={"60%"} height={45} colorMode={"light"}></Skeleton>
      </MotiView>
    );
  }

  const pullingView = async() => {
    setRefresh(true);
    await cargarInfo();
    setRefresh(false);
  }

//-----------------------------------------------------------------------------//
//  Función de retorno para actualización de datos calculados                  //
//  por la aplicación en el paso 2 (hora de llegada, eta, latitud y longitud). //
//-----------------------------------------------------------------------------//
  const startAnimate = async(valorNuevo, valorNuevoE, tiempo, fechaSistemaInicio, horaSistemaInicio) => {

    setBurbuja1("#2166E5");
    setLinea1("#2166E5");
    setBurbuja2("#2166E5");
    setLinea2("#EDF2F9");
    setBurbuja3("black");
    infoData.fechaLlegada = tiempo[0] + "/" + tiempo[1] + "/" + tiempo[2];
    infoData.horaLlegada = tiempo[3] + ":" + tiempo[4];
    infoData.latitud = '';
    infoData.longitud = '';

    console.log(fechaSistemaInicio + " " + horaSistemaInicio + ":00");
    console.log(tiempo[2] + "/" + tiempo[1] + "/" + tiempo[0] + " " + infoData.horaLlegada + ":00");
    let inicio = new Date(fechaSistemaInicio + " " + horaSistemaInicio + ":00");
    let llegada = new Date(tiempo[2] + "/" + tiempo[1] + "/" + tiempo[0] + " " + infoData.horaLlegada + ":00");

    let diferencia = llegada.getTime() - inicio.getTime();
    let minutos = 0;
    console.log(diferencia);
    while (diferencia >= 60000) {
        minutos = minutos + 1;
        diferencia = diferencia - 60000;
    }
    infoData.eta.tiempo = '00:' + (minutos < 10 ? "0" + minutos.toString() : minutos.toString());
    infoData.eta.color = minutos > 30 ? 'red' : 'transparent';
    
    await update(child(ref(database), `folios/correctivos/${infoData.tipoFolio}/${infoData.folio}`), {
        eta: {
          tiempo: infoData.eta.tiempo,
          color: infoData.eta.color
        },
    }).then((snapshot)=>{

        // console.log(infoData);
    });

    setComponente(
        <View style={{width: '100%', height:'100%', backgroundColor:'#ffffff', alignContent:"center", alignItems:"center"}}>
            <ActivityIndicator size="large" color="#2166E5" style={{alignSelf:"center", marginTop:'100%'}}></ActivityIndicator>
        </View>
    );
    setInfoData(infoData);
    setEstado(2);
  };

//--------------------------------------------------------------//
//  Función de retorno para actualización de datos calculados   //
//  por la aplicación en el paso 3 (hora de llegada y sla).     //
//--------------------------------------------------------------//
  const startAnimate2 = async(valorNuevo, valorNuevoE, colores) => {
    console.log(infoData);
    setComponente(null);
    setBurbuja1("#2166E5");
    setLinea1("#2166E5");
    setBurbuja2("#2166E5");
    setLinea2("#2166E5");
    setBurbuja3("#2166E5");

    let activacion = {};
    let inicio = {};
    let tolerancia = 0;
    activacion = await obtenerHoraActivacion();
    inicio = await obtenerHoraInicio();
    tolerancia = await obtenerTolerancia();
    let diferencia = (activacion.newDate.getTime()) - inicio.newDate.getTime();
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
    infoData.sla.color = ( horas > 0 || minutos > tolerancia ) ? 'red' : 'transparent';
    await update(child(ref(database), `folios/correctivos/${infoData.tipoFolio}/${infoData.folio}`), {
        sla: {
          tiempo: infoData.sla.tiempo,
          color: infoData.sla.color
        },
        estado: 3,
        estatus: 3,
    }).then((snapshot)=>{

    });
    infoData.horaActivacion = activacion.hora;
    infoData.fechaActivacion = activacion.fechaScript;
    // infoData.estado = 3;
    setComponente(
        <View style={{width: '100%', height:'100%', backgroundColor:'#ffffff', alignContent:"center", alignItems:"center"}}>
            <ActivityIndicator size="large" color="#2166E5" style={{alignSelf:"center", marginTop:'100%'}}></ActivityIndicator>
        </View>
    );
    setInfoData(infoData);
    setEstado(3);
  };
//----------------------------------------------

  const redireccionar = async() => {
    await manejarFolioCloud({
        folio: infoData.folio,
        tipoFolio: infoData.tipoFolio,
        tecnico: auth.currentUser.uid,
        incidencia: 2
      })
        .then((result) => {
          navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [
                {
                    name: 'Dashboard',
                    params: {}
                }
            ]
          }))
        })
        .catch((error) => {
          console.log(error.code, error.message, error.details);
          console.log(`Error: ${error}`);
        });
  };

//  Funciones para los calculos de SLA 
//----------------------------------------------
  const obtenerHoraInicio = async() => {
        let fInicio = {};
        await get(child(ref(database), `folios/correctivos/${infoData.tipoFolio}/${infoData.folio}/horaInicio`))
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

  const obtenerHoraActivacion = async() => {
    let hora_cierre = {};
    let dia = new Date().getDate(serverTimestamp());
    let mes = new Date().getMonth(serverTimestamp()) + 1;
    let anio = new Date().getFullYear(serverTimestamp());
            
    let hora = new Date().getHours(serverTimestamp());
    let minuto = new Date().getMinutes(serverTimestamp());

    let fechaScript = (dia < 10 ?  '0' + dia.toString() : dia.toString()) + '/' + (mes < 10 ?  '0' + mes.toString() : mes.toString()) + '/' + anio.toString();
    let fechaSistema = anio.toString() + '/' + (mes < 10 ?  '0' + mes.toString() : mes.toString()) + '/' + (dia < 10 ?  '0' + dia.toString() : dia.toString());
    let horario = (hora < 10 ?  '0' + hora.toString() : hora.toString()) + ':' + (minuto < 10 ?  '0' + minuto.toString() : minuto.toString());

    update(child(ref(database), `folios/correctivos/${infoData.tipoFolio}/${infoData.folio}`), {
      estado: 3, 
      horaActivacion: {
        fechaScript: fechaScript,
        fechaSistema: fechaSistema,
        hora: horario
      },
      estatus: 3 
    });
    hora_cierre.fechaScript = fechaScript;
    hora_cierre.hora = horario;
    // setInfoData(infoData);
    hora_cierre.newDate = new Date(fechaSistema + " " + horario + ":00");
    return hora_cierre;
  };

  const obtenerTolerancia = async () => {
    let tiempoTolerancia = 0;
    await get(child(ref(database), `catalogo/tipoFolios/correctivo` + `/${infoData.tipoFolio}`))
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

const llenarCoordenadas = (latitud, longitud) =>{
    infoData.latitud = latitud;
    infoData.longitud = longitud;
    setInfoData(infoData);
    console.log(infoData);
}

//--------------------------------------------------------------//
//  Función encargada de almacenar en el objeto 'infoData' la   //
//  información del folio desde la base de datos.               //
//--------------------------------------------------------------//  
  const cargarInfo = async() => {
    // console.log('Entraste a la función');
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
    await get(child(ref(database), 
        `foliosAsignados/correctivos/activo/${auth.currentUser.uid}`
    ))
    .then(async(snapshot)=>{
      if(snapshot.exists()){
        setComponente(
          <View style={styles.vistaSkeleton}>
            <MySkeleton></MySkeleton>
          </View>
        );
        let llave;
        let tipoFolioLlave;
        let edo;
        snapshot.forEach((folioActivo)=>{
            llave =  Object.keys(folioActivo.val())[0];
            tipoFolioLlave = folioActivo.key;
        });
        infoData.folio = llave;
        infoData.tipoFolio = tipoFolioLlave;
        // setInfoData(infoData);
        // console.log(snapshot);
        ruta = `folios/correctivos/${infoData.tipoFolio}/${infoData.folio}`;
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
                          setLinea2("#EDF2F9");
                          setBurbuja3("black");
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
                  break;
              }
              setTituloPagina("Folio correctivo");
              setEstado(edo);
              // setInfoData(infoData);
          });
        })
        .catch(function (err) {
            console.log(err);
        });
        setInfoData(infoData);
        setEstado(edo);
        // setMostrarPasoUno(true);
      }else{
        setComponente(
          <View style={{width:'100%', height:'100%', justifyContent:"center", alignItems:"center", marginVertical:'60%'}}>
            <View style={{width: '80%', height:'100%'}}>
              <Text style={{textAlign:"center", fontSize: 22, fontWeight:'800'}}>Actualmente no cuentas con folios asignados.</Text>
            </View>
          </View>
        )
      }
    });
    return()=>{     
    }
  };

//--------------------   INICIO DE HOOKS   ---------------------//

//-----------------------------------------------------------//
//  Hook encargado de llamar a la función de carga de 
//  información desde base de datos //
//-----------------------------------------------------------//
  useEffect(() => {
    cargarInfo();
    return()=>{     
    }
  }, []);

//------------------------
//
  useEffect(() => {     
    mounted.current = true;
    return () => mounted.current = false; 
  });
//------------------------

//--------------------------------------------------------------//
//  Hook encargado de escuchar cambios en la propiedad 'estado' //
//  del objeto 'infoData' para renderizar los componentes       //
//--------------------------------------------------------------//
  useEffect(() => {
    // console.log('Habéis modificado los datos'); 
    // console.log(estado)
    switch(estado){
        case 1:
            console.log('Paso 1');
            setComponente(
                <>
                    <InfoExtra
                      style={{ height: "auto" }}
                      infoData={infoData}
                      estadoInicial={false}
                      mostrarMasInfo={true}
                    ></InfoExtra>
                    <Timeline
                      buble1={burbuja1}
                      buble2={burbuja2}
                      buble3={burbuja3}
                      line1={linea1}
                      line2={linea2}
                    ></Timeline>
                    <View>
                        <Tiempos
                          data="Hora de inicio"
                          infoData={infoData}
                        ></Tiempos>
                        <StepOne
                          callback={startAnimate.bind(this)}
                          infoData={infoData}
                          incidencia={2}
                        ></StepOne>
                    </View>
                </>
            );
        break;
        case 2: 
            console.log('Paso 2');
            console.log(infoData);
            setComponente(
                <>
                    <InfoExtra
                        style={{ height: "auto" }}
                        infoData = {infoData}
                        estadoInicial={false}
                        mostrarMasInfo={true}
                    ></InfoExtra>
                    <Timeline
                        buble1={burbuja1}
                        buble2={burbuja2}
                        buble3={burbuja3}
                        line1={linea1}
                        line2={linea2}
                    ></Timeline>
                    <View>
                        <Tiempos
                        data="Llegada al folio"
                        infoData={infoData}
                        ></Tiempos>
                        <View style={{alignContent: "center", width:'100%', alignItems:"center"}}>
                            <StepTwo
                                infoData={infoData}
                                estado={estado}
                                callback={llenarCoordenadas.bind(this)}
                                incidencia={2}
                            ></StepTwo>
                        </View>
                        <Herramientas folio={infoData.folio} tipoFolio={infoData.tipoFolio} incidencia={2}></Herramientas>
                        <MaterialesConcepto folio={infoData.folio} tipoFolio={infoData.tipoFolio} incidencia={2}></MaterialesConcepto>
                        <BotonesStepTwo
                          callback={startAnimate2.bind(this)}
                          infoData={infoData}
                          incidencia={2}
                        ></BotonesStepTwo>
                    </View>
                </>
            );
            break;
        case 3: 
            console.log('Paso 3');
            console.log(estado);
            setComponente(
                <>
                    <InfoExtra
                        style={{ height: "auto" }}
                        infoData={infoData}
                        estadoInicial={false}
                        mostrarMasInfo={true}
                    ></InfoExtra>
                    <Timeline
                    buble1={burbuja1}
                    buble2={burbuja2}
                    buble3={burbuja3}
                    line1={linea1}
                    line2={linea2}
                    ></Timeline>
                    <View style={{alignContent: "center", width:'100%', alignItems:"center"}}>
                            <Coordenadas
                                infoData={infoData}
                            ></Coordenadas>
                        </View>
                    <View>
                        <Tiempos
                        data="Hora de cierre"
                        infoData={infoData}
                        ></Tiempos>
                        <StepThree
                            infoData={infoData}
                            tecnico={auth.currentUser.uid}
                            callback={redireccionar.bind(this)}
                            incidencia={2}
                        ></StepThree>
                    </View>
                </>
            );
            break;
    }      
    return () => {
    };
  }, [estado]);

  useEffect(() => {
    return () => {

    }
  }, [componente]);

  useEffect(() => {
    return () => {

    }
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
    }, 50);
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
        if (mounted.current) {
            return(
                <View style={styles.contenedorPrincipal}>
                    <ScrollView
                      refreshControl={
                        <RefreshControl
                          refreshing={refresh}
                          onRefresh={()=>pullingView()}
                        />
                      }
                    >
                        <View style={ styles.contenedorTitulo }>
                            <Text style={ styles.titulo }>
                                {tituloPagina}
                            </Text>
                        </View>
                        {componente ? componente : <></>}
                    </ScrollView>
                </View>
            );
        }
    }
};

export default Correctivo;

const styles = StyleSheet.create({
  contenedorPrincipal: {
    width: "100%",
    height: "100%",
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

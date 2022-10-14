import {
    StyleSheet,
    View,
    Text,
    // TouchableWithoutFeedback,
    ScrollView,
    Pressable,
    FlatList,
  } from "react-native";
  import { useState, useRef, useCallback, useEffect } from "react";
  import { HelperText, TextInput } from "react-native-paper";
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import { Picker } from "@react-native-picker/picker";
  import EntradaMateriales from "../Componentes/EntradaMateriales";
  import Toast from 'react-native-root-toast';
  import { getAuth } from "firebase/auth";
  import {
    getDatabase,
    child,
    get,
    ref,
    set,
  } from "firebase/database";
  
  const ListaMateriales = (props) => {
    const folio = props.folio;
    const tipoFolio = props.tipoFolio;
    const tipoMaterial = props.tipoMaterial;
    const incidencia = props.incidencia;
    const [lista, setLista] = useState(props.lista);
    const [cantidad, setCantidad] = useState("1");
    const [habilitado, setHabilitado] = useState(true);
    
    const [cantidadMat, setCantidadMat] = useState('');
    const [valorMat, setValorMat] = useState('default');
    const [materiales, setMateriales] = useState(props.materiales);
    let index = props.tamanio;
    const [excepcion, setExcepcion] = useState(0);
    
    const db = getDatabase();
    const auth = getAuth();

    deleteItemById = (id, titulo, cantidad) => {
      console.log(id);

      const filteredData = materiales.filter(item => item.key !== id);
      setMateriales(filteredData);
      lista.push({title: titulo, id: id});

      if(tipoMaterial === 1){
        set(
          child(
          ref(db),
          `folios/${incidencia}/${tipoFolio}/${folio}/materialesUsados/miscelaneos/${titulo}`
          ),
          null
        );
      }else if(tipoMaterial === 2){
        setValorMat('default'); 
        setHabilitado(true);
        set(
          child(
          ref(db),
          `folios/${incidencia}/${tipoFolio}/${folio}/materialesUsados/TP/${titulo}`
          ),
          null
        );
      }
    }

    showToast = (message, color) =>{
      // ToastAndroid.show(message, ToastAndroid.SHORT, styles.tostada);
      let toast = Toast.show(message, {
          duration: Toast.durations.SHORT,
          position: -30,
          // marginBottom: 15,
          shadow: false,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: color,
          borderRadius: 30,
          fontSize: 14,
          textColor: 'white',
          fontWeight: 'bold',
          onShow: () => {
              // calls on toast\`s appear animation start
          },
          onShown: () => {
              // calls on toast\`s appear animation end.
          },
          onHide: () => {
              // calls on toast\`s hide animation start.
          },
          onHidden: () => {
              // setErrorColor('transparent');
          }
      });
      
      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      setTimeout(function () {
          Toast.hide(toast);
      }, 2200);
      clearTimeout();
    }

    // const auth = getAuth();
    const Iconos = createIconSetFromIcoMoon(
      require("../../../../icons/selection.json"),
      "IcoMoon",
      "icomoon.ttf"
    );
    const [iconsLoaded] = Fuentes({
      IcoMoon: require("../../../../icons/icomoon.ttf"),
    });
    const [fontsLoaded] = useFonts({
      Urbanist_400Regular,
    });
  
    if (!iconsLoaded || !fontsLoaded) {
      return <AppLoading />;
    }
    // console.log('Materiales');
    // console.log(materiales);
    return (
        <View style={styles.contenedorMiscelaneos} >
          <FlatList
            ListEmptyComponent={()=>( 
              <Text 
                style={{ alignSelf: "center", justifyContent: "center", paddingTop: 20, paddingBottom: 20, width: '85%', textAlign: 'center' }}
              > 
                Seleccione un material, ingrese cantidad y presione el botón para agregar un material {tipoMaterial == 1 ? 'miscelaneo' : 'de TP' }
              </Text> 
            )}
            data={materiales}
            listKey='MiscelaneoList'
            ListHeaderComponent={() => (
              <View style={{ paddingTop: 10, paddingBottom: 20, width: '85%', alignSelf: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: '700' }}>Folio: {folio}</Text>
              </View>
            )}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => (
              <View style={[styles.contenedorListaMiscelaneos, { marginBottom: 5 }]}>
                <View style={{width:'56%'}}>
                  <Text style={{fontSize: 16}}> {item.titulo} </Text>
                </View>
                <View style={{width:'30%'}}>
                  <Text style={{fontSize: 16, fontWeight: '600'}}> {item.cantidad} </Text>
                </View>
                <View style={{ width: '15%', alignSelf:"center", height: 55 }}>
                  <Iconos 
                    name="borrar" style={styles.eliminar} size={45} 
                    onPress={()=>{
                      deleteItemById(item.key, item.titulo, item.cantidad);
                    }
                  }></Iconos>
                </View>
              </View>
            )}
          ></FlatList>
          <View style={{ width: '100%', justifyContent: "center", alignItems: "center", paddingBottom: 30, paddingTop: 30 }}>
                <EntradaMateriales 
                  folio={folio} 
                  tipoFolio={tipoFolio}
                  tipoMaterial={tipoMaterial}
                  lista={lista}
                  valorMat={valorMat}
                  cantidadMat={cantidadMat}
                  setCantidadMat={setCantidadMat}
                  setValorMat={setValorMat}
                  seleccionado={habilitado}
                  setSeleccionado={setHabilitado}
                ></EntradaMateriales>
                <Pressable
                  disabled={habilitado}
                  onTouchStart={()=>{
                    if(habilitado){
                      setTimeout(() => {
                        showToast('Favor de seleccionar un material.', '#F01028');
                      }, 200);  
                      clearTimeout();
                    }
                  }}
                  onPress={() => {
                    
                    if(tipoMaterial === 1){
                        let temp = new Array();
                        let x = 0;
                        if(index <= (lista.length + materiales.length) ){
                          setHabilitado(true);
                          materiales.push({
                            key: index + excepcion,
                            titulo: valorMat,
                            cantidad: cantidadMat
                          }); 
                          setExcepcion(excepcion + 1);
                          lista.forEach((item)=>{
                            if(item.title !== valorMat){
                              temp.push({title: item.title, id: x});
                              x = x + 1;
                            }
                          });
                            set(
                                child(
                                ref(db),
                                `folios/${incidencia}/${tipoFolio}/${folio}/materialesUsados/miscelaneos/${valorMat}`
                                ),
                                Number(cantidadMat)
                            );
                        }
                        setLista(temp);
                        setCantidadMat('');
                        setValorMat('default');
                    }else if(tipoMaterial === 2){
                          let temp = new Array();
                          let x = 0;
                          if(index <= (lista.length + materiales.length) ){
                            setHabilitado(true);
                            materiales.push({
                              key: index + excepcion,
                              titulo: valorMat,
                              cantidad: cantidadMat
                            }); 
                            setExcepcion(excepcion + 1);
                            console.log(excepcion);

                            lista.forEach((item)=>{
                              if(item.title !== valorMat){
                                temp.push({title: item.title, id: x});
                                x = x + 1;
                              }
                            });

                              set(
                                  child(
                                  ref(db),
                                  `folios/${incidencia}/${tipoFolio}/${folio}/materialesUsados/TP/${valorMat}`
                                  ),
                                  Number(cantidadMat)
                              );
                          }else{
                            setTimeout(() => {
                              showToast('Se utilizaron todos los materiales disponibles.', '#E5BE01');
                            }, 200);  
                            clearTimeout();
                          }
                          setLista(temp);
                          setCantidadMat('');
                          setValorMat('default');
                        }
                  }}
                  style={{ width: "80%" }}
                >
                  <View style={styles.botonAgregar}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      Agregar material
                    </Text>
                    <Iconos
                      name="agregar"
                      size={35}
                      style={{ fontWeight: "bold" }}
                    ></Iconos>
                  </View>
                </Pressable>
              </View>
        </View>
    );
  };
  
  export default ListaMateriales;
  
  const styles = StyleSheet.create({
    contenedorMiscelaneos: {
      width: "100%",
      flexDirection: "column",
      alignSelf: "center",
      marginTop: 25,
      marginBottom: 35,
    //   paddingLeft: '7.5%',
    //   paddingRight: '7.5%'
    },
    contenedorListaMiscelaneos: {
        width: "80%",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25,
        marginBottom: 35,
        // backgroundColor: 'red'
      //   paddingLeft: '7.5%',
      //   paddingRight: '7.5%'
    },   
    botonAgregar: {
      width: "70%",
      padding: 5,
      marginTop: 25,
      marginBottom: 10,
      elevation: 6,
      flexDirection: "row",
      justifyContent: "center",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: "#EDF2F9",
      borderRadius: 10,
    },
    eliminar: {
        backgroundColor: '#EDF2F9',
        height: 55,
        width: '100%',
        borderRadius: 10,
        justifyContent: "center",
        paddingTop: '14%',
        paddingLeft: '5%'
    },
  });
  
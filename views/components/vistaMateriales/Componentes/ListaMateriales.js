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
  
  const ListaMateriales = (props) => {
    const folio = props.folio;
    const tipoMaterial = props.tipoMaterial;
    const [lista, setLista] = useState(props.lista);
    const [cantidad, setCantidad] = useState("1");
    const [index, setIndex] = useState(1);
    const [habilitado, setHabilitado] = useState(true);
  
    const [cantidadMat, setCantidadMat] = useState('');
    const [valorMat, setValorMat] = useState('default');
    const [materiales, setMateriales] = useState(new Array());

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
    detectarCambio = (h, valor, cantidad ) => {
      // console.log('Cantidad: ' + cantidad);
      // console.log('Material: ' + valor);

      // setHablilitado(false);
      // setValorMat(valor);
      // setCantidadMat(cantidad);
      // console.log('Cantidad: ' + cantidadMat);
      // console.log('Material: ' + valorMat);
      // materiales.push({
      //   key: index,
      //   titulo: valor,
      //   cantidad: cantidad
      // });

      // setIndex(index + 1);
      
      //   lista[item.id].estado = false;
      // let i = true;
      // let entrar = false;
      // let temp = new Array();

      // if(listaSeleccionados.length == 0){
      //   listaSeleccionados.push({
      //     elementoRender: indice,
      //     elementoSeleccionado: valor,
      //   });
      // }else{
      //   listaSeleccionados.forEach((item)=>{
      //     entrar = false;
      //     if(item.elementoRender == indice){
      //       // item.elementoSeleccionado = valor;
      //       // listaSeleccionados[item.elementoRender].elementoSeleccionado = valor;
      //       console.log('valor especifico: ' + item.elementoRender);
      //       listaSeleccionados[item.elementoRender].elementoSeleccionado = valor;
      //       i = false;
      //       entrar = true;
      //       console.log('nuevo valor: ');
      //       console.log(item.elementoSeleccionado);
      //     }
      //     if(!entrar){
      //       temp.push({
      //         elementoRender: indice,
      //         elementoSeleccionado: valor,
      //       });
      //     }
      //   });
      //   if(i){
      //     listaSeleccionados.push({
      //       elementoRender: indice,
      //       elementoSeleccionado: valor,
      //     });
      //   }else{
      //     // listaSeleccionados.filter((item, index) => {item.elementoS !== valueToRemove});
      //   }
      // }

      // console.log(lista);

      setHabilitado(h);
    }
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
            // ListFooterComponent={() => (
              
            // )}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => (
              <View style={[styles.contenedorListaMiscelaneos, { marginBottom: 5 }]}>
                <Text> {item.titulo} </Text>
                <Text> {item.cantidad} </Text>
                <View style={{ width: '15%', alignSelf:"center", height: 55 }}>
                  <Iconos name="borrar" style={styles.eliminar} size={45} onPress={()=>{console.log('Eliminando...')}}></Iconos>
                </View>
              </View>
            )}
            // extraData={lista}
          ></FlatList>
          <View style={{ width: '100%', justifyContent: "center", alignItems: "center", paddingBottom: 30 }}>
                <EntradaMateriales 
                  folio={folio} 
                  tipoMaterial={tipoMaterial}
                  lista={lista}
                  // callback={detectarCambio.bind(this)}
                  valorMat={valorMat}
                  cantidadMat={cantidadMat}
                  setCantidadMat={setCantidadMat}
                  setValorMat= {setValorMat}
                ></EntradaMateriales>
                <Pressable
                  // disabled={habilitado}
                  onTouchStart={()=>{
                    // if(habilitado){
                    //   setTimeout(() => {
                    //     // setDespliegue(true);
                    //     showToast('Favor de seleccionar un material antes de agregar otro.', 'red');
                    //   }, 200);  
                    //   clearTimeout();
                    // }
                    // console.log('hola');
                  }}
                  onPress={() => {
                    // console.log(lista.length);
                    // props.saludar();
                    
                    // console.log('Cantidad' + cantidadMat);
                    // console.log(valorMat);
                    let temp = new Array();
                    let x = 0;
                    if(index <= (lista.length + materiales.length) ){
                      materiales.push({
                        key: index,
                        titulo: valorMat,
                        cantidad: cantidadMat
                      });
                      setIndex(index + 1); 
                      console.log(index);   

                      lista.forEach((item)=>{
                        if(item.title !== valorMat){
                          // console.log(valorMat);
                          temp.push({title: item.title, id: x});
                          x = x + 1;
                        }
                      });
                      // console.log(temp);
                      setLista(temp);
                      setCantidadMat('');
                      // console.log(lista);
                    }else{
                      setTimeout(() => {
                        // setDespliegue(true);
                        showToast('Se utilizaron todos los materiales disponibles.', '#E5BE01');
                      }, 200);  
                      clearTimeout();
                    }
                    // console.log(miscelaneo);
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
        flexDirection: "column",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 35,
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
  
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    SectionList,
    FlatList,
    // TextInput,
  } from "react-native";
  import { useState, useRef } from "react";
  import { HelperText, TextInput, Button } from "react-native-paper";
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import { Picker } from "@react-native-picker/picker";
  import { async } from "@firebase/util";
  
  const EntradaConceptos = (props) => {
    const folio = props.folio;
  
    const [coordenadas, setCoordenadas] = useState([]);
    const [coordenadasData, setCoordenadasData] = useState([]);
  
    const [conceptoSeleccionado, setConceptoSeleccionado] = useState("default");
    const [habilitado, setHabilitado] = useState(true);
    const [esEditable, setEsEditable] = useState(false);
    const [cantidad, setCantidad] = useState("");
  
    const [cantidadC, setCantidadC] = useState(0);
    const [title, setTitulo] = useState(new Array());
  
    agregarItemConceptos = () => {
      title.push({
        keyConceptos: cantidadC,
        titulo: "Titulo",
      });
      let send = cantidadC + 1;
      setCantidadC(send);
    };
  
    llenarArreglo = async (datos) => {
      // console.log('Cantidad Total: ' + cantidad);  
      for (var i = 0; i < parseInt(cantidad); i++) {
        setCoordenadasData(coordenadasData.push("19.299268,-99.2231495"));
      }  
      setCoordenadas([
        ...coordenadas,
        { title: "coordenadas", data: coordenadasData },
      ]);
    };
  
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
          <View style={[styles.contenedorMaterialesTP, { marginBottom: 5 }]}>
            <View style={styles.contenedorSelectMaterial}>
              <View style={{ width: "60%", height: 55, alignSelf: "center" }}>
                <HelperText style={styles.helperMaterial}>Concepto</HelperText>
                <Picker
                  style={styles.selector}
                  mode="dropdown"
                  selectedValue={conceptoSeleccionado}
                  dropdownIconColor="black"
                  onFocus={() => {
                    setHabilitado(false);
                  }}
                  onBlur={() => {
                    setHabilitado(true);
                  }}
                  onValueChange={async (itemValue, itemIndex) => {
                    setHabilitado(true);
                    setConceptoSeleccionado(itemValue);
                    if (itemValue == "default") {
                      setCantidad("");
                    } else {
                      setEsEditable(true);
                      if (cantidad == "") {
                        setCantidad("1");
                        // setCoordenadasData();
                        // setCoordenadas([...coordenadas, { title: "coordenadas", data: [...coordenadasData, '19.299268,-99.2231495'] }]);
                        // console.log(coordenadas);
                      }
                    }
                  }}
                >
                  <Picker.Item
                    style={styles.itemSelector}
                    label="Selecciona una opción"
                    value="default"
                    enabled={habilitado}
                  />
                  <Picker.Item
                    style={styles.itemSelector}
                    label="AER-008"
                    value="AER-008"
                  />
                  <Picker.Item
                    style={styles.itemSelector}
                    label="LASH-004"
                    value="LASH-004"
                  />
                  <Picker.Item
                    style={styles.itemSelector}
                    label="MTFO-018"
                    value="MTFO-018"
                  />
                </Picker>
              </View>
              <View style={{ width: "25%", alignSelf: "center", height: 55 }}>
                <HelperText style={styles.helper}>Cantidad</HelperText>
                <TextInput
                  style={[styles.inputCustomizedInfo]}
                  underlineColor="transparent"
                  activeUnderlineColor="#2166E5"
                  selectionColor="#2166E5"
                  keyboardType="numeric"
                  autoFocus={false}
                  editable={esEditable}
                  onEndEditing={async () => {
                    // console.log('Cantidad por verificar');
                    // if(conceptoSeleccionado == 'CAB-024' && cantidad != ''){
                    //     console.log('Cantidad aceptada');
                    //     if(parseInt(cantidad) > 0){
                    //         console.log('Cantidad mayor');
                    //         setCoordenadas(new Array);
                    //         setCoordenadasData(new Array);
                    //         console.log(coordenadasData);
                    //         await llenarArreglo('listo');
                    //         console.log('listo')
                    //     }
                    // }
                  }}
                  onChangeText={(cantidad) => setCantidad(cantidad)}
                  onBlur={() => {
                    if (cantidad == "") {
                      setCantidad("1");
                    }
                  }}
                  value={cantidad}
                ></TextInput>
              </View>
              <View style={{ width: "15%", alignSelf: "center", height: 55 }}>
                <Iconos
                  name="borrar"
                  style={styles.eliminar}
                  size={45}
                  onPress={() => {
                    console.log("Eliminando...");
                  }}
                ></Iconos>
              </View>
            </View>
          </View>
    );
  };
  
  export default EntradaConceptos;
  
  const styles = StyleSheet.create({
    contenedorSelectMaterial: {
      flexDirection: "row",
      padding: 8,
      elevation: 4,
      backgroundColor: "white",
      borderRadius: 10,
    },
    selector: {
      backgroundColor: "#EDF2F9",
      // height: 35,
      marginTop: "-7%",
      // borderRadius: 10
    },
    itemSelector: {
      fontFamily: "Urbanist_400Regular",
      fontSize: 15,
      borderRadius: 10,
      zIndex: 999,
    },
    contenedorMaterialesTP: {
      width: "85%",
      flexDirection: "column",
      alignSelf: "center",
      marginTop: 25,
      marginBottom: 35,
    },
    inputCustomizedInfo: {
      width: "80%",
      height: 40,
      backgroundColor: "#EDF2F9",
      alignSelf: "center",
      fontSize: 15,
      borderRadius: 10,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      borderBottomLeftRadius: 10,
      color: "black",
      textAlign: "center",
      justifyContent: "center",
      marginTop: "-5%",
      zIndex: 1,
    },
    helper: {
      height: 25,
      fontWeight: "bold",
      color: "black",
      fontSize: 11,
      alignSelf: "center",
      marginTop: "-8%",
      zIndex: 999,
    },
    helperMaterial: {
      height: 25,
      fontWeight: "bold",
      color: "black",
      fontSize: 11,
      alignSelf: "flex-start",
      marginTop: "-5%",
      zIndex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    helperCoordenadas: {
      height: 22,
      fontWeight: "bold",
      color: "black",
      fontSize: 11,
      alignSelf: "flex-start",
      marginTop: "-2%",
      alignItems: "center",
      justifyContent: "flex-start",
      zIndex: 999,
      paddingLeft: "10%",
    },
    eliminar: {
      backgroundColor: "#EDF2F9",
      height: 55,
      width: "100%",
      borderRadius: 10,
      justifyContent: "center",
      paddingTop: "14%",
      paddingLeft: "5%",
    },
    coordenadas: {
      width: "100%",
      marginTop: 10,
      marginLeft: "5%",
      flexDirection: "row",
    },
    contenedorBlancoCoordenadas: {
      backgroundColor: "white",
      elevation: 4,
      width: "60%",
      height: 60,
      flexDirection: "column",
      borderRadius: 10,
      paddingTop: 5,
      paddingBottom: 5,
    },
    contenedorGrisCoordenadas: {
      width: "90%",
      backgroundColor: "#EDF2F9",
      height: 40,
      borderRadius: 10,
      zIndex: 1,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "-4%",
    },
  });
  
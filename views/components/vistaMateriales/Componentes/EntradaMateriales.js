import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableWithoutFeedback,
    // TextInput,
  } from "react-native";
  import { useState, useRef, useCallback, useEffect } from "react";
  import { HelperText, TextInput } from "react-native-paper";
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import {Picker} from '@react-native-picker/picker';
  import {
    getDatabase,
    child,
    get,
    ref,
    limitToFirst,
    set,
  } from "firebase/database";
  import { getAuth } from "firebase/auth";
  
  const EntradaMateriales = (props) => {
    const folio = props.folio;
    const tipoMaterial = props.tipoMaterial;
    const lista = props.lista;
    const llave = props.llave;
    const cantidad = props.cantidadMat;
    const setCantidadMat = props.setCantidadMat;
    const materialSeleccionado = props.valorMat;
    const setMaterialSeleccionado = props.setValorMat;
    // console.log(llave);
    // const [materialSeleccionado, setMaterialSeleccionado] = useState('default');
    const [habilitado, setHabilitado] = useState(true);
    const [deshabilitar, setDeshabilitar] = useState(true);
    // const [cantidad, setCantidad] = useState('');
    const [i, setI] = useState(0);
    const [cargarPicker, setCargarPicker] = useState(true);
    const [addDefaultValue, setAddDefaultValue] = useState(true);
    const db = getDatabase();
    const auth = getAuth();

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

    // const saludar = () => {
    //     console.log('Hola desde el select');
    // }
        // console.log(lista);
    return (
        <View style={styles.contenedorSelectMaterial}>
            <View style={{ width: '60%', height: 50, alignSelf:"center" }}>
                <HelperText style={styles.helperMaterial}>Material</HelperText>
                <Picker
                    style={styles.selector}
                    mode='dropdown'
                    selectedValue={materialSeleccionado}
                    dropdownIconColor='black'
                    enabled={habilitado}
                    onFocus={()=>{
                        setHabilitado(false);
                    }}
                    onBlur={()=>{
                        setHabilitado(true);
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                        setHabilitado(true);
                        // console.log(itemValue);
                        setMaterialSeleccionado(itemValue);
                        // if(tipoMaterial === 1){
                        //     set(
                        //         child(
                        //         ref(db),
                        //         `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/miscelaneos/${materialSeleccionado}`
                        //         ),
                        //         null
                        //     );
                        // }else if(tipoMaterial === 2){
                        //     set(
                        //         child(
                        //         ref(db),
                        //         `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/TP/${materialSeleccionado}`
                        //         ),
                        //         null
                        //     );
                        // }
                        // console.log(itemValue);
                        if(addDefaultValue || cantidad == ''){
                            setCantidadMat('1');
                            setAddDefaultValue(false);
                            console.log(cantidad);

                            // props.callback(
                            //     false,
                            //     itemValue,
                            //     1
                            // );
                            // if(tipoMaterial === 1){
                            //     set(
                            //         child(
                            //           ref(db),
                            //           `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/miscelaneos/${itemValue}`
                            //         ),
                            //         1
                            //     );
                            // }else if(tipoMaterial === 2){
                            //     set(
                            //         child(
                            //           ref(db),
                            //           `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/TP/${itemValue}`
                            //         ),
                            //         1
                            //     );
                            // }
                        }else{
                            // props.callback(
                            //     false,
                            //     itemValue,
                            //     cantidad
                            // );
                        }
                        // }else{
                        //     if(tipoMaterial === 1){
                        //         set(
                        //             child(
                        //               ref(db),
                        //               `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/miscelaneos/${itemValue}`
                        //             ),
                        //             Number(cantidad)
                        //         );
                        //     }else if(tipoMaterial === 2){
                        //         set(
                        //             child(
                        //               ref(db),
                        //               `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/TP/${itemValue}`
                        //             ),
                        //             Number(cantidad)
                        //         );
                        //     }
                        // }
                        // props.lista = new Array();
                        // console.log(llave);
                        // console.log(materialSeleccionado);
                        
                    }}
                >
                    <Picker.Item style={styles.itemSelector} label="Selecciona una opción" value="default" enabled={habilitado} />
                    {lista.map((item) => (<Picker.Item  style={[styles.itemSelector]} 
                                                        label={item.title} 
                                                        value={item.title} 
                                                        key={item.id} 
                                        />))}
                </Picker>
            </View>
            <View style={{ width: '25%', alignSelf:"center", height: 55 }}>
                <HelperText style={styles.helper}>Cantidad</HelperText>
                <TextInput
                    value={cantidad}
                    style={[styles.inputCustomizedInfo]}
                    underlineColor="transparent"
                    activeUnderlineColor="#2166E5"
                    selectionColor="#2166E5"
                    keyboardType="numeric"
                    autoFocus={false}
                    onChangeText={ (cantidad) => setCantidadMat(cantidad) }
                    onBlur={()=>{
                        if(cantidad == ''){
                            setCantidadMat('1');
                        }
                        // if(tipoMaterial === 1){
                        //     set(
                        //         child(
                        //         ref(db),
                        //         `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/miscelaneos/${materialSeleccionado}`
                        //         ),
                        //         Number(cantidad)
                        //     );
                        // }else if(tipoMaterial === 2){
                        //     set(
                        //         child(
                        //         ref(db),
                        //         `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/materialesUsados/TP/${materialSeleccionado}`
                        //         ),
                        //         Number(cantidad)
                        //     );  
                        // }
                    }}
                ></TextInput>
            </View>
            
        </View>
    );
  };
  
  export default EntradaMateriales;
  
  const styles = StyleSheet.create({
    contenedorSelectMaterial: {
        flexDirection: 'row',
        padding: 8,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10
    },
    selector: {
        backgroundColor: '#EDF2F9', 
        // height: 35,
        marginTop: '-6%',
        // borderRadius: 10
    },
    itemSelector: {
        fontFamily: 'Urbanist_400Regular',
        fontSize: 15,
        borderRadius: 10,
        zIndex: 999,
        color: 'black',
    },
    inputCustomizedInfo: {
        width: '80%',
        height: 40 ,
        backgroundColor: '#EDF2F9',
        alignSelf: 'center',
        fontSize: 15,
        borderRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomLeftRadius: 10,
        color: 'black',
        textAlign: "center",
        justifyContent: "center",
        marginTop: '-5%',
        zIndex: 1
    },
    helper: {
        height: 25,
        fontWeight: "bold",
        color: 'black',
        fontSize: 11,
        alignSelf: "center",
        marginTop: '-8%',
        zIndex: 999
    },
    helperMaterial: {
        height: 25,
        fontWeight: "bold",
        color: 'black',
        fontSize: 11,
        alignSelf: 'flex-start',
        marginTop: '-5%',
        zIndex: 1,
        alignItems: "center",
        justifyContent: 'flex-start'
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
  
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    // TextInput,
  } from "react-native";
  import { useState, useRef } from "react";
  import { HelperText, TextInput } from "react-native-paper";
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import {Picker} from '@react-native-picker/picker';
  
  const EntradaMateriales = (props) => {
    const folio = props.folio;
    const [materialSeleccionado, setMaterialSeleccionado] = useState('default');
    const [habilitado, setHabilitado] = useState(true);
    const [cantidad, setCantidad] = useState('1');

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
        <View style={styles.contenedorSelectMaterial}>
            <View style={{ width: '60%', height: 55, alignSelf:"center" }}>
                <HelperText style={styles.helperMaterial}>Material</HelperText>
                <Picker
                    style={styles.selector}
                    mode='dropdown'
                    selectedValue={materialSeleccionado}
                    dropdownIconColor='black'
                    onFocus={()=>{
                        setHabilitado(false);
                    }}
                    onBlur={()=>{
                        setHabilitado(true);
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                        setMaterialSeleccionado(itemValue)
                    }
                >
                    <Picker.Item style={styles.itemSelector} label="Selecciona una opción" value="default" enabled={habilitado} />
                    <Picker.Item style={styles.itemSelector} label="Java" value="java" />
                    <Picker.Item style={styles.itemSelector} label="JavaScript" value="js" />
                </Picker>
            </View>
            <View style={{ width: '25%', alignSelf:"center", height: 55 }}>
                <HelperText style={styles.helper}>Cantidad</HelperText>
                <TextInput
                    style={[styles.inputCustomizedInfo]}
                    underlineColor="transparent"
                    activeUnderlineColor="#2166E5"
                    selectionColor="black"
                    keyboardType="numeric"
                    autoFocus={false}
                    onChangeText={ (cantidad) => setCantidad(cantidad) }
                    onBlur={()=>{
                        if(cantidad == ''){
                            setCantidad('1');
                        }
                    }}
                    value={cantidad}
                ></TextInput>
            </View>
            <View style={{ width: '15%', alignSelf:"center", height: 55 }}>
                <Iconos name="borrar" style={styles.eliminar} size={45} onPress={()=>{console.log('Eliminando...')}}></Iconos>
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
        marginTop: '-7%',
        // borderRadius: 10
    },
    itemSelector: {
        fontFamily: 'Urbanist_400Regular',
        fontSize: 15,
        borderRadius: 10,
        zIndex: 999
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
  
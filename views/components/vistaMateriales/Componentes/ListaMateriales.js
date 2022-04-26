import {
    StyleSheet,
    View,
    Text,
    // TouchableWithoutFeedback,
    ScrollView,
    Pressable,
    FlatList,
    // TextInput,
  } from "react-native";
  import { useState, useRef } from "react";
  import { HelperText, TextInput } from "react-native-paper";
  import { useFonts as Fuentes } from "expo-font";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
  import { Picker } from "@react-native-picker/picker";
  import EntradaMateriales from "../Componentes/EntradaMateriales";
  
  const ListaMateriales = (props) => {
    const folio = props.folio;
    const tipoMaterial = props.tipoMaterial;
    const [materialSeleccionado, setMaterialSeleccionado] = useState("default");
    const [habilitado, setHabilitado] = useState(true);
    const [cantidad, setCantidad] = useState("1");
  
    const [cantidadMisc, setCantidadMisc] = useState(0);
    const [miscelaneo, setMiscelaneo] = useState(new Array());
    
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
                style={{ alignSelf: "center", justifyContent: "center", paddingTop: 20, width: '85%', textAlign: 'center' }}
              > 
                Presione el botón para agregar un material {tipoMaterial == 1 ? 'miscelaneo' : 'de TP' }
              </Text> 
            )}
            data={miscelaneo}
            listKey='MiscelaneoList'
            ListHeaderComponent={() => (
              <View style={{ paddingTop: 10, paddingBottom: 20, width: '85%', alignSelf: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: '700' }}>Folio: {folio}</Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={{ width: '100%', justifyContent: "center", alignItems: "center", paddingBottom: 30 }}>
                <Pressable
                  onPress={() => {
                    miscelaneo.push({
                      keyMiscelaneos: cantidadMisc,
                      titulo: "miscelaneo",
                    });
                    let send = cantidadMisc + 1;
                    setCantidadMisc(send);
                    console.log(miscelaneo);
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
            )}
            keyExtractor={(item) => item.keyMiscelaneos}
            renderItem={({ item }) => (
              <View style={[styles.contenedorListaMiscelaneos, { marginBottom: 5 }]}>
                <EntradaMateriales 
                  folio={folio} 
                  tipoMaterial={tipoMaterial}
                  key={item.keyMiscelaneos}
                  title={item.titulo}
                ></EntradaMateriales>
              </View>
            )}
          ></FlatList>
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
  });
  
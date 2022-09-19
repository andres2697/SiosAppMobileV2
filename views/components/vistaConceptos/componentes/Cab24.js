import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform, 
  ActivityIndicator
} from "react-native";
import { useState, useRef, useCallback, useContext, useEffect } from "react";
import { HelperText, TextInput, Button } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { async } from "@firebase/util";
import { AntDesign } from '@expo/vector-icons'; 
import { getAuth } from "firebase/auth";
import { getDatabase, child, get, ref, set, push } from "firebase/database";
import * as Location from 'expo-location';

const Cab24 = (props) => {
  const folio = props.folio;
  const tipoFolio = props.tipoFolio;
  const [coordenadas, setCoordenadas] = useState(new Array());
  const [cantidad, setCantidad] = useState(0);
  const [habilitado, setHabilitado] = useState(false);
  // const [ubicacion, setUbicacion] = useState(null);

  const db = getDatabase();
  const auth = getAuth();
  Location.setGoogleApiKey("AIzaSyCL6SrNElBbvIVhJtW3t_K4cn8OasyznsQ");

  deleteItemById = (id) => {
    console.log(id);

    const filteredData = coordenadas.filter(item => item.keyCoordenadas !== id);
    setCoordenadas(filteredData);

      set(
        child(
        ref(db),
        `folios/correctivos/${tipoFolio}/${folio}/conceptosUsados/CAB-024/${id}`
        ),
        null
      );
  }

  agregarItemCoordenadas = async() => {
    setHabilitado(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    let coordenada = location.coords.latitude.toString() + "," + location.coords.longitude.toString();
    
    const postListRef = ref(db, `folios/correctivos/${tipoFolio}/${folio}/conceptosUsados/CAB-024`);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      coordenada
    });

    let arrayId = newPostRef.toString().split('/');
    let llave = arrayId[arrayId.length - 1];

    coordenadas.push({
      keyCoordenadas: llave,
      coordenadasData: coordenada,
    });
    let send = cantidad + 1;
    setCantidad(send);
    return false;
  };

  const cargarConceptos = useCallback(async()=>{

    let i = 0;
    let consulta1 = await get(
      child(
        ref(db),
        `folios/correctivos/${tipoFolio}/${folio}/conceptosUsados/CAB-024`
      )
    )
      .then((snapshot) => {
        // console.log(snapshot);
        snapshot.forEach((element) => {
          coordenadas.push({
            keyCoordenadas: element.key,
            coordenadasData: element.val().coordenada,
          });
          // let send = cantidad + 1;
          i = i + 1;
        });
      })
      .catch(function (err) {});
      setCantidad(i);
      console.log("Nueva cantidad: " + cantidad.toString());
      // console.log(coordenadas);
  });

  useEffect(()=> {
    cargarConceptos();
  }, []);

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
    <SafeAreaView style={{flex:0}}>
        <FlatList
          ListEmptyComponent={null}
          data={coordenadas}
          refreshing= {true}
          ListHeaderComponent={() => (
            <View style={styles.contenedorSelectMaterial}>
              <View style={{ width: "65%", height: 55, alignSelf: "flex-end" }}>
                <HelperText style={styles.helperConcepto}>Concepto</HelperText>
                <TextInput
                  style={styles.inputCustomizedInfoCab}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  selectionColor="black"
                  value="CAB-024"
                  editable={false}
                ></TextInput>
              </View>
              <View
                style={{
                  width: "35%",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 55,
                }}
              >
                <ActivityIndicator
                  size='small'
                  color='black'
                  style={ {display: habilitado ? 'flex' : 'none'} }
                >
                </ActivityIndicator>
                <Iconos
                  name="agregar"
                  style={[styles.agregar, {display: habilitado ? 'none' : 'flex'}]}
                  size={45}
                  onPress={async() => {
                    let listo = await agregarItemCoordenadas();
                    setHabilitado(listo);
                  }}
                ></Iconos>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ width: '100%', height: 5 }}>
    
            </View>
          )}
          renderItem={({ item }) => (
            <View>
              <View style={{ width: "100%", flexDirection: "row", paddingVertical:5, paddingLeft:'7%' }}>
                <View style={styles.contenedorBlancoCoordenadas}>
                  <HelperText style={styles.helperCoordenadas}>Coordenada</HelperText>
                  <View style={styles.contenedorGrisCoordenadas}>
                    <Text>{item.coordenadasData}</Text>
                  </View>
                </View>
                <View style={{ width: "18%", justifyContent: "center" }}>
                  <Button
                    mode="contained"
                    compact={true}
                    onPress={async() => {
                      let { status } = await Location.requestForegroundPermissionsAsync();
                      if (status !== 'granted') {
                        console.log('Permission to access location was denied');
                        return;
                      }
                  
                      let location = await Location.getCurrentPositionAsync();
                      let coordenada = location.coords.latitude.toString() + "," + location.coords.longitude.toString();

                      // item.coordenadasData = coordenada;
                      let actualizarUbicacion = new Array();
                      coordenadas.forEach((element) => {
                        if(element.keyCoordenadas === item.keyCoordenadas){
                          actualizarUbicacion.push({
                            keyCoordenadas: element.keyCoordenadas,
                            coordenadasData: coordenada,
                          });
                        }else{
                          actualizarUbicacion.push({
                            keyCoordenadas: element.keyCoordenadas,
                            coordenadasData: element.coordenadasData,
                          });
                        }
                      });

                      setCoordenadas(actualizarUbicacion);

                      set(
                        child(
                        ref(db),
                        `folios/correctivos/${tipoFolio}/${folio}/conceptosUsados/CAB-024/${item.keyCoordenadas}/coordenada`
                        ),
                        coordenada
                      );
                    }}
                    // contentStyle={{ height: 40 }}
                    uppercase={false}
                    color="white"
                    style={{
                      backgroundColor: "#2166E5",
                      borderRadius: 50,
                      alignSelf: 'flex-end',
                    //   width: 50
                    }}
                  >
                    <AntDesign name="find" size={22} color="white"/>
                  </Button>
                </View>
                <View  style={{ width: "17%", justifyContent: "center" }}>
                    <Button
                        // mode="contained"
                        compact={true}
                        onPress={() => {
                          deleteItemById(item.keyCoordenadas);
                        }}
                        // contentStyle={{ height: 40 }}
                        uppercase={false}
                        color="white"
                        style={{
                            backgroundColor: "#EC2137",
                            borderRadius: 50,
                            alignSelf: 'flex-end',
                            //   width: 50
                        }}
                    >
                        <Iconos name="borrar" size={25} color="white"/>
                    </Button>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.keyCoordenadas}
        ></FlatList>
    </SafeAreaView>
  );
};

export default Cab24;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  contenedorSelectMaterial: {
    width: "60%",
    flexDirection: "row",
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 3,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "flex-end",
    alignContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  inputCustomizedInfoCab: {
    width: "100%",
    height: 45,
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
    marginTop: "-9%",
    zIndex: 1,
  },
  helperConcepto: {
    height: 25,
    fontWeight: "bold",
    color: "black",
    fontSize: 11,
    alignSelf: "flex-start",
    marginTop: "-6%",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  helperCoordenadas: {
    height: 25,
    fontWeight: "bold",
    color: "black",
    fontSize: 11,
    alignSelf: "flex-start",
    marginTop: "-5%",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  agregar: {
    backgroundColor: "#EDF2F9",
    height: 50,
    width: "70%",
    borderRadius: 10,
    justifyContent: "center",
    paddingTop: "8%",
    marginLeft: "6%",
    paddingLeft: "3%",
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

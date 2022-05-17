import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useRef } from "react";
import { HelperText, TextInput, Button } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { Picker } from "@react-native-picker/picker";
import { async } from "@firebase/util";
import TarjetaConceptos from "./TarjetaConceptos";
import Toast from 'react-native-root-toast';
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  child,
  get,
  ref,
  set,
} from "firebase/database";

const EntradaConceptos = (props) => {
  const folio = props.folio;
  const [conceptos, setConceptos] = useState(props.lista);
  const [listaConceptos, setLista] = useState(props.conceptos);
  let index = props.tamanio;
  const [excepcion, setExcepcion] = useState(1);

  const db = getDatabase();
  const auth = getAuth();
  
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState("default");
  const [esEditable, setEsEditable] = useState(true);
  const [habilitado, setHabilitado] = useState(true);
  const [cantidad, setCantidad] = useState("");
  const [cantidadC, setCantidadC] = useState(0);

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
    <View>
      <FlatList
        ListEmptyComponent={() => (
          <Text style={{ alignSelf: "center" }}>
            {" "}
            Presione el botón para agregar un concepto{" "}
          </Text>
        )}
        data={listaConceptos}
        listKey="ConceptList"
        keyExtractor={(item) => item.keyConceptos}
        ListHeaderComponent={() => (
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 20,
              width: "85%",
              alignSelf: "center",
            }}
          >
          </View>
        )}
        renderItem={({ item }) => (
          <View style={[styles.contenedorConceptos, { marginBottom: 5 }]}>
            <Text> {item.titulo} </Text>
            <Text> {item.cantidad} </Text>
            <View style={{ width: "15%", alignSelf: "center", height: 55 }}>
              <Iconos
                name="borrar"
                style={styles.eliminar}
                size={45}
                onPress={() => {
                  let filteredData = listaConceptos.filter(list => list.keyConceptos !== item.keyConceptos);
                  conceptos.push({title: item.titulo, id: item.keyConceptos});
                    set(
                      child(
                      ref(db),
                      `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/conceptosUsados/${item.titulo}`
                      ),
                      null
                    );

                  setConceptoSeleccionado('default');
                  listaConceptos.splice(0, listaConceptos.length);
                  setLista(filteredData);
                }}
              ></Iconos>
            </View>
          </View>
          // </View>
        )}
      ></FlatList>
      <View style={{ width: "100%" }}>
        <TarjetaConceptos
          conceptos={conceptos}
          conceptoSeleccionado={conceptoSeleccionado}
          setConceptoSeleccionado={setConceptoSeleccionado}
          setCantidad={setCantidad}
          cantidad={cantidad}
          esEditable={esEditable}
          setEsEditable={setEsEditable}
          seleccionado={habilitado}
          setSeleccionado={setHabilitado}
        ></TarjetaConceptos>
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
            let temp = new Array();
            let x = 0;

            if( (conceptos.length + listaConceptos.length) < index ){
              setTimeout(() => {
                showToast('Se utilizaron todos los materiales disponibles.', '#E5BE01');
              }, 200);  
              clearTimeout();
            }else{
              setHabilitado(true);
              listaConceptos.push({
                keyConceptos: index + excepcion,
                titulo: conceptoSeleccionado,
                cantidad: cantidad
              }); 
              setExcepcion(excepcion + 1);
              conceptos.forEach((item)=>{
                if(item.title !== conceptoSeleccionado){
                  temp.push({id: x, title: item.title });
                  x = x + 1;
                }
              });
  
              set(
                child(
                  ref(db),
                    `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/conceptosUsados/${conceptoSeleccionado}`
                ),
                Number(cantidad)
              );
              setConceptos(temp);
              setCantidad('');
              let send = cantidadC + 1;
              setCantidadC(send);

            }              // setHabilitado(true);
          }}
          style={{ width: "100%" }}
        >
          <View style={styles.botonAgregar}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Agregar concepto
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
  contenedorConceptos: {
    width: "85%",
    flexDirection: "column",
    alignSelf: "center",
    // marginTop: 5,
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
  botonAgregar: {
    width: "50%",
    padding: 5,
    marginTop: 25,
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

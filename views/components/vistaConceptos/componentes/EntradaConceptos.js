import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  SectionList,
  FlatList,
  Pressable,
  ActivityIndicator
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
import TarjetaConceptos from "./TarjetaConceptos";

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

//   agregarItemConceptos = () => {

//   };

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
        ListEmptyComponent={()=>( <Text style={{ alignSelf: "center" }}> Presione el botón para agregar un concepto </Text> )}
        data={title}
        listKey='ConceptList'
        keyExtractor={(item) => item.keyConceptos}
        renderItem={({ item }) => (
          <TarjetaConceptos
            key={item.keyConceptos}
            title={item.titulo}
          ></TarjetaConceptos>
          // </View>
        )}
        ListFooterComponent={() => (
            <View style={{ width: '100%' }}>
                <Pressable
                    onPress={() => {
                        title.push({
                            keyConceptos: cantidadC,
                            titulo: "Titulo",
                          });
                        let send = cantidadC + 1;
                        setCantidadC(send);
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
        )}
      ></FlatList>
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

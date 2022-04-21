import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar
} from "react-native";
import { useState, useRef } from "react";
import { HelperText, TextInput, Button } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { Picker } from "@react-native-picker/picker";
import { async } from "@firebase/util";
import CoordenadasCab24 from "./CoordenadasCab24";

const Cab24 = (props) => {
  const folio = props.folio;
  const [coordenadas, setCoordenadas] = useState(new Array());
  const [cantidad, setCantidad] = useState(0);

  agregarItemCoordenadas = () => {
    coordenadas.push({
      keyCoordenadas: cantidad,
      coordenadasData: "19.299268,-99.2231495",
    });
    let send = cantidad + 1;
    setCantidad(send);
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
    <SafeAreaView style={{flex:0}}>
        <FlatList
          ListEmptyComponent={null}
          data={coordenadas}
          ListHeaderComponent={() => (
            <View style={styles.contenedorSelectMaterial}>
              <View style={{ width: "65%", height: 55, alignSelf: "flex-end" }}>
                <HelperText style={styles.helperConcepto}>Concepto</HelperText>
                <TextInput
                  style={styles.inputCustomizedInfoCab}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  selectionColor="black"
                  value="CAB-24"
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
                <Iconos
                  name="agregar"
                  style={styles.agregar}
                  size={45}
                  onPress={() => {
                    agregarItemCoordenadas();
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
            <CoordenadasCab24
              folio={folio}
              key={item.keyCoordenadas}
              title={item.coordenadasData}
            ></CoordenadasCab24>
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
    padding: 8,
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

import {
  StyleSheet,
  AppState,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ToastAndroid,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { HelperText, TextInput as Paper } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { getDatabase, child, get, ref, limitToFirst } from "firebase/database";

const StepTwo = (props) => {
  const navigation = useNavigation();

  const Iconos = createIconSetFromIcoMoon(
    require("../../../icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  const [iconsLoaded] = Fuentes({
    IcoMoon: require("../../../icons/icomoon.ttf"),
  });
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
  });

  if (!iconsLoaded || !fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <View style={styles.contenedorAvance}>
        <View style={styles.row}>
          <View style={styles.contenedorInput}>
            <HelperText style={styles.helper}>Latitud</HelperText>
            <TextInput
              style={[styles.inputCustomizedInfo, { marginRight: "2%" }]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              selectionColor="transparent"
              autoFocus={false}
              onChangeText={() => {}}
              value='19.2992515'
              editable={false}
              multiline={true}
            ></TextInput>
          </View>
          <View style={styles.contenedorInput}>
            <HelperText style={styles.helper}>Longitud</HelperText>
            <TextInput
              style={[styles.inputCustomizedInfo, { marginRight: "2%" }]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              selectionColor="transparent"
              autoFocus={false}
              onChangeText={() => {}}
              value='-99.2225652'
              editable={false}
              multiline={true}
            ></TextInput>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.contenedorInput}>
            <HelperText style={styles.helper}>ETA</HelperText>
            <TextInput
              style={[styles.inputCustomizedInfo, { marginRight: "2%" }]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              selectionColor="transparent"
              autoFocus={false}
              onChangeText={() => {}}
              value='ETA'
              editable={false}
              multiline={true}
            ></TextInput>
          </View>
          <View style={styles.contenedorInput}>
            <HelperText style={styles.helper}>SLA</HelperText>
            <TextInput
              style={[styles.inputCustomizedInfo, { marginRight: "2%" }]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              selectionColor="transparent"
              autoFocus={false}
              onChangeText={() => {}}
              value='SLA'
              editable={false}
              multiline={true}
            ></TextInput>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  contenedorAvance: {
    width: "85%",
    marginTop: 10,
    marginBottom: 5,
    flex: 0,
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    paddingBottom: 6,
    width: "100%",
    // backgroundColor: 'red',
    justifyContent: "space-around",
  },
  contenedorInput: {
    flexDirection: "column",
    width: "42%",
  },
  button: {
    flex: 0,
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#2166E5",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    height: 45,
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  inputCustomizedInfo: {
    height: 45,
    width: "100%",
    backgroundColor: "#EDF2F9",
    marginTop: "-10%",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 10,
    color: "black",
    textAlign: "center",
    // letterSpacing: 0.5
  },
  helper: {
    fontWeight: "bold",
    color: "black",
    fontSize: 11,
    zIndex: 999,
    elevation: 6
    // flex:10
  },
});

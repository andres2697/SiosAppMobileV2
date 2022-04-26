import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import {
  getDatabase,
  child,
  get,
  ref,
  limitToFirst,
  set,
} from "firebase/database";
import DateTimePicker from "react-native-modal-datetime-picker";
import { getAuth } from "firebase/auth";

const Herramientas = (props) => {
  const db = getDatabase();
  const auth = getAuth();
  const folio = props.folio;

  const navigation = useNavigation();
  const [potenciaInicial, setPotenciaInicial] = useState("");
  const [potenciaFinal, setPotenciaFinal] = useState("");
  const [potenciaInicialTemp, setPotenciaInicialTemp] = useState("a");
  const [potenciaFinalTemp, setPotenciaFinalTemp] = useState("a");
  const [horario, setHorario] = useState(new Date());
  const [horarioText, setHorarioText] = useState("-- : --");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const cargarInfoPotencia = useCallback(async () => {
    const variable1 = await get(
      child(
        ref(db),
        `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potencias`,
        limitToFirst(1)
      )
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val()['potenciaFinal']);
          // console.log(snapshot.val()['horaMedicion']);
          if (snapshot.val()["potenciaInicial"] !== undefined) {
            setPotenciaInicial(snapshot.val()["potenciaInicial"]);
            setPotenciaInicialTemp(snapshot.val()["potenciaInicial"]);
          }
          if (snapshot.val()["potenciaFinal"] !== undefined) {
            setPotenciaFinal(snapshot.val()["potenciaFinal"]);
            setPotenciaFinalTemp(snapshot.val()["potenciaFinal"]);
          }
          if (snapshot.val()["horaMedicion"] !== undefined) {
            setHorarioText(snapshot.val()["horaMedicion"]);
          }
        }
      })
      .catch(function (err) {});
    const variables = await get(
      child(
        ref(db),
        `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potenciaInicial`,
        limitToFirst(1)
      )
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setPotenciaInicial(snapshot.val());
          setPotenciaInicialTemp(snapshot.val());
        }
      })
      .catch(function (err) {});
  });

  useEffect(() => {
    cargarInfoPotencia();
  }, []);

  // console.log(selectorFecha);
  const showMode = (currentMode) => {
    setShow(true);
    // setMode(currentMode);
  };

  const closeDatetimePicker = () => {
    setShow(false);
  };

  const handleSelectDate = (date) => {
    let escribirHorario = "";

    if (date.getMinutes() > 9) {
      escribirHorario =
        (date.getHours() < 9
          ? "0" + date.getHours().toString()
          : date.getHours().toString()) +
        ":" +
        date.getMinutes().toString();
      setHorarioText(escribirHorario);
    } else {
      escribirHorario =
        (date.getHours() < 9
          ? "0" + date.getHours().toString()
          : date.getHours().toString()) +
        ":0" +
        date.getMinutes().toString();
      setHorarioText(escribirHorario);
    }
    set(
      child(
        ref(db),
        `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potencias/horaMedicion`
      ),
      escribirHorario
    );
    closeDatetimePicker();
  };

  const Iconos = createIconSetFromIcoMoon(
    require("../../icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  const [iconsLoaded] = Fuentes({
    IcoMoon: require("../../icons/icomoon.ttf"),
  });
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
  });

  if (!iconsLoaded || !fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.contenedorHerramientas}>
      <View style={{ marginBottom: "5%" }}>
        <Text
          style={{
            color: "#9DA9BB",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 15,
            alignSelf: "center",
          }}
        >
          Herramientas del técnico
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", width: "100%", alignContent: "center" }}
      >
        <View
          style={{ width: "50%", flexDirection: "row", alignContent: "center" }}
        >
          <View
            style={{
              width: "52%",
              justifyContent: "center",
              paddingLeft: "5%",
            }}
          >
            <Text style={{ fontSize: 14 }}>Potencia inicial</Text>
          </View>
          <View style={{ width: "48%" }}>
            <TextInput
              style={[styles.inputCustomizedInfo, { alignSelf: "flex-start" }]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              selectionColor="#2166E5"
              keyboardType="numeric"
              autoFocus={false}
              onChangeText={(potenciaInicial) =>
                setPotenciaInicial(potenciaInicial)
              }
              onBlur={() => {
                // console.log('Quitaste el focus');
                if (potenciaInicialTemp === "a") {
                  setPotenciaInicialTemp(potenciaInicial);
                  set(
                    child(
                      ref(db),
                      `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potencias/potenciaInicial`
                    ),
                    potenciaInicial
                  );
                } else if (potenciaInicialTemp === potenciaInicial) {
                  setPotenciaInicialTemp(potenciaInicial);
                  // console.log('no se envio nada a la base de datos');
                } else if (potenciaInicialTemp != potenciaInicial) {
                  if (potenciaInicial != "") {
                    setPotenciaInicialTemp(potenciaInicial);
                    set(
                      child(
                        ref(db),
                        `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potencias/potenciaInicial`
                      ),
                      potenciaInicial
                    );
                  } else {
                    set(
                      child(
                        ref(db),
                        `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potencias/potenciaInicial`
                      ),
                      null
                    );
                  }
                }
              }}
              value={potenciaInicial}
            ></TextInput>
          </View>
        </View>
        <View style={{ width: "50%", flexDirection: "row" }}>
          <View style={{ width: "52%", justifyContent: "center" }}>
            <Text style={{ fontSize: 14, alignSelf: "center" }}>
              Potencia final
            </Text>
          </View>
          <View style={{ width: "48%" }}>
            <TextInput
              style={[styles.inputCustomizedInfo]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              selectionColor="#2166E5"
              keyboardType="numeric"
              autoFocus={false}
              onChangeText={(potenciaFinal) => setPotenciaFinal(potenciaFinal)}
              value={potenciaFinal}
              onBlur={() => {
                // console.log('Quitaste el focus');
                if (potenciaFinalTemp === "a") {
                  setPotenciaFinalTemp(potenciaFinal);
                  set(
                    child(
                      ref(db),
                      `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potencias/potenciaFinal`
                    ),
                    potenciaFinal
                  );
                } else if (potenciaFinalTemp === potenciaFinal) {
                  setPotenciaFinalTemp(potenciaFinal);
                  // console.log('no se envio nada a la base de datos');
                } else if (potenciaFinalTemp != potenciaFinal) {
                  if (potenciaInicial != "") {
                    setPotenciaFinalTemp(potenciaFinal);
                    set(
                      child(
                        ref(db),
                        `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potencias/potenciaFinal`
                      ),
                      potenciaFinal
                    );
                  } else {
                    set(
                      child(
                        ref(db),
                        `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potencias/potenciaFinal`
                      ),
                      null
                    );
                  }
                }
              }}
            ></TextInput>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignContent: "center",
          marginTop: "5%",
        }}
      >
        <View style={{ width: "35%", marginRight: "5%" }}>
          <Text style={{ textAlign: "center" }}>
            Hora de la primera medición
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          <Pressable
            onPress={() => {
              setHorario(new Date());
              showMode("time");
            }}
          >
            <View style={styles.contenedorBotonTimePicker}>
              <View style={{ width: "70%", alignItems: "center" }}>
                <Text style={{ fontSize: 16 }}>{horarioText}</Text>
              </View>
              <View style={{ width: "30%" }}>
                <Iconos
                  name="reloj"
                  size={38}
                  style={styles.iconoBoton}
                ></Iconos>
              </View>
            </View>
          </Pressable>
          <DateTimePicker
            date={horario}
            isVisible={show}
            mode={"time"}
            is24Hour={true}
            timePickerModeAndroid={"spinner"}
            // locale="en_GB"
            onConfirm={handleSelectDate}
            // onChange={ (event, date) => {
            //   console.log('cambiaste hora');
            //   setHorario(date);
            // }}
            onCancel={() => {
              closeDatetimePicker(horario);
            }}
          />
        </View>
        <View style={{width: '15%', marginLeft: "5%"}}>
          <TouchableHighlight
            style={{ width: "90%", borderRadius: 50, backgroundColor: 'red' }}
            underlayColor={"#F67280"}
            activeOpacity={0.3}
            onPress={() => {
              set(
                child(
                  ref(db),
                  `foliosAsignados/${auth.currentUser.uid}/correctivo/activo/${folio}/potencias/horaMedicion`
                ),
                null
              );
              setHorarioText("-- : --");
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                // backgroundColor: "red",
                alignSelf: "center",
                borderRadius: 50,
                padding: 7,
              }}
            >
              <Iconos
                style={{
                  // backgroundColor: "#F67280",
                  alignSelf: "center",
                  borderRadius: 50,
                  paddingRight: 3,
                }}
                name="borrar"
                size={35}
                color="white"
              ></Iconos>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Herramientas;

const styles = StyleSheet.create({
  contenedorHerramientas: {
    width: "85%",
    marginTop: 20,
    marginBottom: 5,
    flex: 0,
    //   alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  inputCustomizedInfo: {
    height: 45,
    width: "85%",
    backgroundColor: "#EDF2F9",
    alignSelf: "flex-end",
    fontSize: 15,
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 0,
    color: "black",
    textAlign: "center",
  },
  iconoBoton: {
    color: "black",
    flex: 0,
  },
  contenedorBotonTimePicker: {
    height: 45,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#EDF2F9",
    borderRadius: 10,
  },
});

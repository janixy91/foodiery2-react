import React, { useEffect, useState } from "react";

import axios from "../utils/axios";
import moment from "moment";
import View from "../components/atoms/View";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import DatePicker from "../components/compositions/DatePicker";
import LoadingSpinner from "../components/atoms/Loading";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { AiOutlineClose } from "react-icons/ai";
import TextInput from "../components/atoms/TextInput";
import { MAIN_COLOR } from "../constants/colors";
import Header from "../components/compositions/Header";
import { useNavigate } from "react-router-dom";
import TouchableOpacity from "../components/atoms/TouchableOpacity";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({
    birthday: null,
  });
  const [cambiandoContrasena, setCambiandoContrasena] = useState(false);
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState("");
  const { logout, user: session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadContent, setLoadContent] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const showConfirmDelete = () => {
    const confirmResult = window.confirm(
      "¿Estás seguro que quieres borrar tu cuenta?"
    );

    if (confirmResult) {
      onDeleteAccount();
    }
  };

  async function loadProfile() {
    setLoadContent(false);

    try {
      const response = await axios.get(`/users`, {
        headers: {
          authorization: session._id,
        },
      });
      setUser({
        name: response.data.name,
        birthday: new Date(response.data.birthday).getTime(),
      });
      setError(false);
    } catch (e) {
      setError(true);
    }
    setLoadContent(true);
  }

  const saveData = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `/users`,
        { ...user },
        {
          headers: {
            authorization: session._id,
          },
        }
      );
      toast.success("Datos cambiados correctamente");
    } catch (e) {
      toast.error("Ha habido un error, inténtalo de nuevo más tarde");
    }

    setLoading(false);
  };

  const handleConfirm = (date) => {
    setUser({ ...user, birthday: date });
  };

  const onChangePassword = async () => {
    // Lógica para cambiar la contraseña
    if (nuevaContrasena === confirmarNuevaContrasena) {
      try {
        setLoading(true);

        const response = await axios.put(
          `/users/password`,
          { newPassword: nuevaContrasena, oldPassword: contrasenaActual },
          {
            headers: {
              authorization: session._id,
            },
          }
        );

        setContrasenaActual("");
        setNuevaContrasena("");
        setConfirmarNuevaContrasena("");
        setCambiandoContrasena(false);
        toast.success("Contraseña cambiada correctamente");
      } catch (e) {
        if (e.response.request.status === 401) {
          toast.error("Contraseña actual incorrecta");
        } else {
          toast.error("Ha habido un error, inténtalo de nuevo más tarde");
        }
      }
    } else {
      toast.error("Las contraseñas no coinciden");
    }

    setLoading(false);
  };

  function onLogout() {
    logout();
  }

  const renderDatePicker = () => {
    return (
      <View>
        <DatePicker
          onDateSelected={handleConfirm}
          selectedDate={user?.birthday}
        />
      </View>
    );
  };

  async function onDeleteAccount() {
    try {
      setLoading(true);

      const response = await axios.delete(`/users`, {
        headers: {
          authorization: session._id,
        },
      });

      onLogout();
    } catch (e) {
      toast.error("Ha habido un error, inténtalo de nuevo más tarde");
    }
    setLoading(false);
  }

  function onBack() {
    navigate("/home");
  }

  return (
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        background: "white",
        marginTop: "76px",
      }}
    >
      <Header
        left={
          <MdOutlineArrowBackIosNew
            onClick={onBack}
            size={20}
            color="white"
            style={{ position: "relative", top: 4 }}
          />
        }
        title={"Perfil"}
        style={{ height: 60, backgroundColor: MAIN_COLOR, flex: "0 0 auto" }}
      />

      {loadContent && error && (
        <Text
          style={{
            ...styles.restaurantName,
            fontSize: 18,
            textAlign: "center",
            color: "black",
            padding: 10,
          }}
        >
          Ha habido un error en el servidor, inténtalo de nuevo mas tarde :(
        </Text>
      )}
      <View>
        <View style={styles.container}>
          {!error && (
            <>
              <View
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#eeeeee",
                  padding: 16,
                  borderRadius: 8,
                }}
              >
                <Text style={styles.label}>Nombre de usuario</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={user.name}
                  onChangeText={(text) => setUser({ ...user, name: text })}
                />
                <Text style={styles.label}>Fecha de nacimiento</Text>
                {renderDatePicker()}

                <Button
                  text="Guardar Datos"
                  onPress={saveData}
                  style={{ marginTop: 16 }}
                />
              </View>
            </>
          )}
          {!error && (
            <>
              <View
                style={{
                  ...styles.cambiarContrasenaContainer,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#eeeeee",
                  padding: 16,
                  borderRadius: 8,
                }}
              >
                {cambiandoContrasena && (
                  <TouchableOpacity
                    onPress={() => setCambiandoContrasena(!cambiandoContrasena)}
                  >
                    <AiOutlineClose
                      size={24}
                      color="black"
                      style={{ textAlign: "right", marginBottom: 16 }}
                    />
                  </TouchableOpacity>
                )}

                {!cambiandoContrasena && (
                  <Button
                    text={"Cambiar Contraseña"}
                    onPress={() => setCambiandoContrasena(!cambiandoContrasena)}
                  />
                )}

                {cambiandoContrasena && (
                  <View>
                    <Text style={styles.label}>Contraseña Actual</Text>

                    <TextInput
                      style={styles.input}
                      placeholder="Contraseña Actual"
                      secureTextEntry
                      value={contrasenaActual}
                      onChangeText={(text) => setContrasenaActual(text)}
                    />
                    <Text style={styles.label}>Nueva Contraseña</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Nueva Contraseña"
                      secureTextEntry
                      value={nuevaContrasena}
                      onChangeText={(text) => setNuevaContrasena(text)}
                    />
                    <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirmar Nueva Contraseña"
                      secureTextEntry
                      value={confirmarNuevaContrasena}
                      onChangeText={(text) => setConfirmarNuevaContrasena(text)}
                    />

                    <Button
                      text="Cambiar Contraseña"
                      onPress={onChangePassword}
                    />
                  </View>
                )}
              </View>
            </>
          )}

          <div
            onClick={onLogout}
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#eeeeee",
              padding: 8,
              position: "relative",
              top: 20,
            }}
          >
            Cerrar sesión
          </div>
          <div
            onClick={showConfirmDelete}
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#eeeeee",
              padding: 8,
              marginTop: 100,
            }}
          >
            Borrar cuenta
          </div>
          {<LoadingSpinner loading={loading} />}
        </View>
      </View>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    borderStyle: "solid",
    paddingHorizontal: 10,
  },
  cambiarContrasenaContainer: {
    marginTop: 20,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
};

export default Profile;

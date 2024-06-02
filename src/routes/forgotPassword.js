// ForgotPassword.js
import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import Text from "../components/atoms/Text";
import View from "../components/atoms/View";
import Image from "../components/atoms/Image";
import TouchableOpacity from "../components/atoms/TouchableOpacity";
import Loading from "../components/atoms/Loading";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const LoginImage = require("../assets/loginimage.png");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    validateEmail();
    if (!emailError) {
      try {
        setLoading(true);

        const response = await axios.post(`/users/forgot-password`, {
          email: email.toLowerCase(),
        });

        if (response.status === 200) {
          toast.success(
            "¡Vale!, Si tienes una cuenta, te llegará un email para poder restablecer contraseña. Recuerda mirar en la carpeta de spam."
          );

          setEmail("");
        }
      } catch (e) {
        if (e.response?.request.status === 404) {
          toast.error("El email no esta registrado");
        } else {
          toast.error("Ha habido un error, inténtalo de nuevo más tarde");
        }
      }
    }

    setLoading(false);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Ingrese una dirección de correo electrónico válida");
    } else {
      setEmailError("");
    }
  };

  function handleLogin() {
    navigate("/login");
  }

  return (
    <View style={styles.container}>
      <Image
        source={LoginImage}
        style={{
          height: "auto",
          maxHeight: 300,
          maxWidth: 400,
          marginTop: 0,
          marginBottom: 10,
        }}
      />
      <Text style={{ ...styles.title, marginBottom: 10, display: "block" }}>
        Recuperar Contraseña
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico registrado"
        onChangeText={(text) => setEmail(text)}
        value={email}
        onBlur={validateEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Button
        style={{ marginTop: 16 }}
        text={"Enviar Correo de Recuperación"}
        onPress={handleResetPassword}
        disabled={!email || emailError}
      />

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.registerLink}>Volver al login</Text>
        </TouchableOpacity>
      </View>
      {<Loading loading={loading} />}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    background: "white",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 6,
    paddingHorizontal: 10,
    borderStyle: "solid",
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
};

export default ForgotPassword;

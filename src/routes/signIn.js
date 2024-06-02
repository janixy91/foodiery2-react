// SignIn.js
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import Text from "../components/atoms/Text";
import View from "../components/atoms/View";
import Image from "../components/atoms/Image";
import TouchableOpacity from "../components/atoms/TouchableOpacity";
import { useAuth } from "../hooks/useAuth";
import axios from "../utils/axios";
import Loading from "../components/atoms/Loading";
import { toast } from "react-toastify";
import { MAIN_COLOR } from "../constants/colors";

const SignIn = () => {
  const LoginImage = require("../assets/loginimage.png");
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    validateEmail();

    // Continuar con la lógica de recuperación de contraseña si el email es válido
    if (!emailError) {
      try {
        setLoading(true);
        const response = await axios.post(`/users/login`, {
          email: email.toLowerCase(),
          password,
        });

        await login(response.data);
        navigate("/home");
      } catch (e) {
        if (e.response?.request.status === 401) {
          toast.error("Email o contraseña inválidos");
        } else {
          toast.error("Ha habido un error, inténtalo de nuevo más tarde");
        }
      }
    }

    setLoading(false);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  function handleForgotPassword() {
    navigate("/forgot-password");
  }

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Ingrese una dirección de correo electrónico válida");
    } else {
      setEmailError("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ background: "white", padding: 20, height: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={LoginImage}
            style={{
              height: "auto",
              maxHeight: 200,
              maxWidth: 400,
              marginTop: 0,
              marginBottom: 10,
            }}
          />
        </div>
        <Text
          classname="title"
          style={{ ...styles.title, marginBottom: 10, display: "block" }}
        >
          Iniciar sesión
        </Text>
        <TextInput
          style={{
            ...styles.input,
            marginBottom: 16,
          }}
          placeholder="Correo electrónico"
          onChangeText={(text) => setEmail(text)}
          onBlur={validateEmail}
          value={email}
          editable={!loading}
          selectTextOnFocus={!loading}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          editable={!loading}
          selectTextOnFocus={!loading}
          type="password"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text
              style={{ ...styles.registerLink, marginTop: 6, display: "block" }}
            >
              ¿Olvidaste la contraseña?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          text={"Iniciar sesión"}
          onPress={handleLogin}
          disabled={!password || !email || loading}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
          <Button text={"Regístrate aquí"} onPress={handleRegister} />
        </View>
      </div>

      <Loading loading={loading} />
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    width: "100vw",
    // backgroundImage: "url('/patron.jpg')",
    // backgroundSize: "contain",
  },
  title: {
    fontSize: 24,
    color: MAIN_COLOR,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderStyle: "solid",
  },

  registerText: {
    marginBottom: 4,
    display: "block",
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
    // marginTop: 8,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
    display: "block",
  },
};

export default SignIn;

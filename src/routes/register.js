// Register.js
import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import Text from "../components/atoms/Text";
import View from "../components/atoms/View";
import Image from "../components/atoms/Image";
import TouchableOpacity from "../components/atoms/TouchableOpacity";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/atoms/Loading";
import { toast } from "react-toastify";
import {
  MAIN_COLOR,
  OTHER_BLUE,
  OTHER_ORANGE,
  SECOND_COLOR,
} from "../constants/colors";

const Register = () => {
  const LoginImage = require("../assets/loginimage.png");
  const { login } = useAuth();
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleRegister = async () => {
    validateEmail();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");

      return;
    }

    if (!emailError) {
      try {
        setLoading(true);
        const response = await axios.post(`/users/register`, {
          email: email.toLowerCase(),
          password,
        });
        await login(response.data);
        navigate("/");
      } catch (e) {
        console.log(e, "eee");
        if (e.response?.request.status === 400) {
          toast.error("Email ya registrado en la aplicación");
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleAcceptedChange = (event) => {
    setAccepted(event.target.checked);
  };

  return (
    <div style={{ width: "100%" }}>
      <View style={styles.container}>
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
            Registro
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
            onBlur={validateEmail}
            disabled={loading}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <View style={styles.passwordContainer}>
            <TextInput
              style={{ ...styles.input, ...styles.passwordInput }}
              placeholder="Contraseña"
              type={!showPassword ? "password" : "text"}
              onChangeText={(text) => setPassword(text)}
              value={password}
              disabled={loading}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              {showPassword && (
                <FaEyeSlash
                  style={styles.eyeIcon}
                  name="eye-with-line"
                  size={24}
                  color={OTHER_ORANGE}
                />
              )}
              {!showPassword && (
                <FaEye
                  style={styles.eyeIcon}
                  name="eye"
                  size={24}
                  color={OTHER_BLUE}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={{ ...styles.input, ...styles.passwordInput }}
              placeholder="Confirmar Contraseña"
              type={!showConfirmPassword ? "password" : "text"}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              disabled={loading}
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword}>
              {showConfirmPassword && (
                <FaEyeSlash
                  style={styles.eyeIcon}
                  name="eye-with-line"
                  size={24}
                  color={OTHER_ORANGE}
                />
              )}
              {!showConfirmPassword && (
                <FaEye
                  style={styles.eyeIcon}
                  name="eye"
                  size={24}
                  color={OTHER_BLUE}
                />
              )}
            </TouchableOpacity>
          </View>

          <div style={{ marginTop: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={accepted}
                onChange={handleAcceptedChange}
                style={{ marginRight: 10 }}
              />
              Acepto los{" "}
              <a
                href="https://www.privacypolicies.com/live/77a4613e-dfca-4c4a-8caf-30421b34728d"
                target="_blank"
                rel="noopener noreferrer"
              >
                términos y las condiciones
              </a>
            </label>
          </div>
          <Button
            style={{ marginTop: 16 }}
            text={"Registrarse"}
            onPress={handleRegister}
            disabled={
              !handleRegister ||
              !confirmPassword ||
              !email ||
              loading ||
              !accepted
            }
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={styles.registerText}>¿Ya tienes una cuenta?</Text>
            <Button text={"Inicia sesión aquí"} onPress={handleLogin} />

            {/* <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.registerLink}>Inicia sesión aquí</Text>
            </TouchableOpacity> */}
          </View>
          <Loading loading={loading} />
        </div>
      </View>
    </div>
  );
};

const styles = {
  passwordContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingRight: 20,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  container: {
    padding: 16,
    minHeight: "100%",
    padding: 16,
    height: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: MAIN_COLOR,
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
};

export default Register;

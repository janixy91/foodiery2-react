import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/atoms/TextInput";
import Text from "../components/atoms/Text";
import View from "../components/atoms/View";
import Image from "../components/atoms/Image";
import ModalNewPlate from "../components/modals/ModalNewPlate/ModalNewPlate";
import axios from "../utils/axios";
import Button from "../components/atoms/Button";
import {
  MAIN_COLOR,
  MAIN_COLOR2,
  SECOND_COLOR,
  SECOND_COLOR2,
} from "../constants/colors";
import { useAuth } from "../hooks/useAuth";
import TouchableOpacity from "../components/atoms/TouchableOpacity";
import Header from "../components/compositions/Header";
import LoadingSpinner from "../components/atoms/Loading";
import { GoPlus } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import MyContext from "../context/Context";
import useRestaurants from "../hooks/useRestaurants";
import RestaurantItem from "../components/compositions/restaurantItem/RestaurantItem";

const Visited = () => {
  const Plate = require("../assets/plate.png");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { ctxRestaurants } = useContext(MyContext);
  const { load: loadContent, loading, error } = useRestaurants();

  const handleRestaurantPress = (restaurantId) => {
    navigate("/restaurant", { state: { restaurantId } });
  };

  function onGoProfile() {
    navigate("/profile");
  }

  function onBack() {
    navigate(-1);
  }

  function onGoCreate() {
    navigate("/create-plate", {
      state: { step: 1, from: "home" },
    });
  }

  function bannerError() {
    console.log("An error");
    return;
  }

  return (
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        background: MAIN_COLOR,
        paddingBottom: "20px",
      }}
    >
      <Header
        style={{ backgroundColor: MAIN_COLOR }}
        title={"Restaurantes visitados"}
        left={
          <TouchableOpacity
            onPress={() => onBack()}
            style={{ paddingRight: 20, position: "relative", top: 4 }}
          >
            <IoIosArrowBack
              name="user"
              size={22}
              color="white"
              // style={{ marginRight: 16 }}
            />
          </TouchableOpacity>
        }
        // right={
        //   <TouchableOpacity
        //     onPress={() => onGoProfile()}
        //     style={{ paddingRight: 20, position: "relative", top: 4 }}
        //   >
        //     <FaUserLarge
        //       name="user"
        //       size={22}
        //       color="white"
        //       // style={{ marginRight: 16 }}
        //     />
        //   </TouchableOpacity>
        // }
      />
      {/* <View
        style={{
          height: "10vh",
          backgroundColor: MAIN_COLOR,
          position: "fixed",
          zIndex: 90,
          width: "100%",
          top: 60,
        }}
      ></View> */}
      <View
        style={{
          marginTop: "76px",
          width: "90%",
          display: "flex",
          zIndex: 100,
          flex: 1,
        }}
      >
        <View style={styles.container}>
          {ctxRestaurants.length > 0 && (
            <TextInput
              style={styles.input}
              placeholder="Buscar sitio visitado"
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
            />
          )}

          {ctxRestaurants.length > 0 && (
            <ul style={{ margin: 0, padding: 0 }}>
              {ctxRestaurants
                .filter((restaurant) =>
                  restaurant.name
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((item, index) => {
                  return (
                    <li key={index} style={{ listStyle: "none" }}>
                      <RestaurantItem
                        {...item}
                        onPress={() => handleRestaurantPress(item._id)}
                        style={
                          index === ctxRestaurants.length - 1
                            ? styles.lastRestaurant
                            : {}
                        }
                      />
                    </li>
                  );
                })}
            </ul>
          )}

          {ctxRestaurants.length === 0 && loadContent && !error && (
            <View style={{ marginTop: 0, textAlign: "center" }}>
              <Text
                style={{
                  ...styles.restaurantName,
                  fontSize: 18,
                  textAlign: "center",
                  color: "black",
                  display: "block",
                }}
              >
                Empieza añadiendo una nueva visita
              </Text>
              <Image
                source={Plate}
                style={{
                  height: "auto",
                  maxHeight: 200,
                  marginTop: 40,
                  marginBottom: 20,
                }}
                resizeMode="contain" // Esto hará que la imagen se ajuste proporcionalmente y cubra el contenedor
              />

              <Button
                onPress={onGoCreate}
                className={"super-button"}
                text={
                  <div class="home__button-add">
                    <MdOutlineAddLocationAlt
                      size={24}
                      color="white"
                      style={{ marginLeft: 8 }}
                    />
                    <span class="home__button-add-text">¡Nueva visita!</span>
                  </div>
                }
              />
            </View>
          )}
          {loadContent && error && (
            <Text
              style={{
                ...styles.restaurantName,
                fontSize: 18,
                textAlign: "center",
                color: "black",
              }}
            >
              Ha habido un error en el servidor, inténtalo de nuevo mas tarde :(
            </Text>
          )}
          {/* Botón flotante para agregar nuevo restaurante */}
          {ctxRestaurants.length > 0 && (
            <TouchableOpacity style={styles.addButton} onPress={onGoCreate}>
              <GoPlus size={24} color="white" />
              <MdOutlineAddLocationAlt
                size={24}
                color="white"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={bannerError}
        /> */}
      </View>
      <LoadingSpinner loading={loading} />
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    width: "90%",
    marginTop: 0,
    zIndex: 100,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    background: "white",
    borderRadius: 16,
    webkitBoxShadow: "0px 7px 11px 0px rgba(230,230,230,1)",
    mozBoxShadow: "0px 7px 11px 0px rgba(230,230,230,1)",
    boxShadow: "0px 7px 11px 0px rgba(230,230,230,1)",
    border: "1px solid #d7d7d7",
    borderBottom: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#dddddd",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderStyle: "solid",
  },
  addButton: {
    position: "fixed",
    bottom: 8,
    right: 8,
    backgroundColor: SECOND_COLOR2,
    padding: "12px 8px ",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    zIndex: 1999,
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
  lastRestaurant: {
    marginBottom: 70,
  },
};

export default Visited;

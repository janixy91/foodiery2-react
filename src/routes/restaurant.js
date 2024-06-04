// RestaurantList.js
import React, { useEffect, useState } from "react";

import Moment from "moment";
import axios from "../utils/axios";
import { MAIN_COLOR, OTHER_ORANGE, SECOND_COLOR2 } from "../constants/colors";
import TextInput from "../components/atoms/TextInput";
import View from "../components/atoms/View";
import Header from "../components/compositions/Header";
import TouchableOpacity from "../components/atoms/TouchableOpacity";
import { GoPlus } from "react-icons/go";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../components/atoms/Loading";
import PlateItem from "../components/compositions/plateItem/PlateItem";
import { MdOutlineAddLocationAlt } from "react-icons/md";

const RestaurantList = () => {
  Moment.locale("es");
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurant, setRestaurant] = useState({});
  const [plates, setPlates] = useState([]);
  const navigate = useNavigate();
  const { user: session } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRestaurants();
  }, [location.state.restaurantId]);

  async function loadRestaurants() {
    setLoading(true);
    const response = await axios.get(`/restaurants/allInfo`, {
      params: { restaurantId: location.state.restaurantId },
      headers: {
        authorization: session._id,
      },
    });
    setLoading(false);

    if (response.data.length === 0) {
      navigate("/home");
    } else {
      setRestaurant(response.data[0]);
      setPlates(response.data[0].plates);
    }
  }

  function onGoCreate() {
    navigate("/create-plate", {
      state: { restaurant, step: 2, from: "restaurant" },
    });
  }

  function onEditPlate(plate) {
    navigate("/create-plate", {
      state: { restaurant, step: 4, from: "edit", plate },
    });
  }

  function onBack() {
    navigate("/visited");
  }
  return (
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        background: "white",
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
        onBack
        title={restaurant.name}
        style={{ height: 60, backgroundColor: MAIN_COLOR, flex: "0 0 auto" }}
      />

      <View
        style={{
          height: "10vh",
          backgroundColor: MAIN_COLOR,
          position: "fixed",
          zIndex: 90,
          width: "100%",
          top: 59,
        }}
      ></View>
      <View
        style={{
          marginTop: "76px",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          zIndex: 100,
          flex: 1,
          background: "white",
          borderRadius: 16,
          webkitBoxShadow: "0px 7px 11px 0px rgba(230,230,230,1)",
          mozBoxShadow: "0px 7px 11px 0px rgba(230,230,230,1)",
          boxShadow: "0px 7px 11px 0px rgba(230,230,230,1)",
          border: "1px solid #d7d7d7",
          borderBottom: 0,
        }}
      >
        <View style={styles.container}>
          {/* <TextInput
            style={styles.input}
            placeholder="Buscar plato"
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          /> */}
          <ul style={{ margin: 0, padding: 0 }}>
            {plates
              .filter((restaurant) =>
                restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, index) => {
                return (
                  <div>
                    <PlateItem {...item} onClick={() => onEditPlate(item)} />
                  </div>
                );
              })}
          </ul>

          <TouchableOpacity style={styles.addButton} onPress={onGoCreate}>
            <GoPlus size={24} color="white" />
            <PiBowlFoodDuotone
              name="silverware-fork-knife"
              size={24}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LoadingSpinner loading={loading} />
    </div>
  );
};

const styles = {
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    width: "90%",
    zIndex: 100,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    zIndex: 100,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 14,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#dddddd",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 0,
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 16,
    borderStyle: "solid",
  },
  restaurantItem: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingVertical: 8,
    position: "relative",
  },
  plateNameRepeat: {
    height: 34,
    width: 34,
    marginRight: 8,
  },
  plateNameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  plateDate: {
    marginTop: 1,
    fontSize: 12,
    color: "gray",
    display: "block",
  },
  restaurantName: {
    flex: 1,
  },
  commentContainer: {
    marginTop: 10,
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
  lastPlate: {
    marginBottom: 70,
  },
};

export default RestaurantList;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import StepNamePlate from "../components/modals/ModalNewPlate/stepNamePlate";
import StepSummary from "../components/modals/ModalNewPlate/stepSummary";
import StepImage from "../components/modals/ModalNewPlate/stepImage";
import Header from "../components/modals/ModalNewPlate/header";
import StepRestaurant from "../components/modals/ModalNewPlate/stepRestaurant";
import View from "../components/atoms/View";
import LoadingSpinner from "../components/atoms/Loading";
import axios from "../utils/axios";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import StepVisit from "../components/modals/ModalNewPlate/stepVisit";

const NewPlate = ({ plateProps }) => {
  const { state } = useLocation();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState(state.restaurant);
  const [step, setStep] = useState(state.step);
  // si viene de la home, del restaurante, o editando.
  const [from, setFrom] = useState(state.from);
  const [plate, setPlate] = useState(state.plate);
  const [visit, setVisit] = useState(null);
  const [dishRating, setDishRating] = useState(5);
  // lista de platos del restaurate para el paso 3
  const [platesToSelect, setPlatesToSelect] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [dishComment, setDishComment] = useState(plate?.comment);
  const [selectedRepeatOption, setSelectedRepeatOption] = useState(
    plate?.repeat || true
  );
  const [dishImage, setDishImage] = useState(plate?.image);
  const [dishFile, setDishFile] = useState(plate?.image);
  const [selectedDate, setSelectedDate] = useState(
    plate?.date || new Date().getTime()
  );
  const navigate = useNavigate();
  console.log(restaurant, "restaurant");

  useEffect(() => {
    if (state.restaurant) {
      setRestaurant(state.restaurant);
    }
    if (state.step) {
      setStep(state.step);
    }
    if (state.from) {
      setFrom(state.from);
    }
    if (state.plate) {
      setPlate(state.plate);
    }
  }, [state]);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    if (restaurant) {
      loadPlatesToRestaurantSelected(restaurant);
    }
  }, [restaurant]);

  async function onDeleteReview() {
    setLoading(true);
    try {
      const response = await axios.delete(`/review`, {
        headers: {
          authorization: user._id,
        },
        params: {
          _id: plate._id,
        },
      });
      navigate(-1);
    } catch (e) {}
    setLoading(false);
  }

  const onSave = async () => {
    if (from === "edit") {
      updateReview();
    } else {
      addReview();
    }
  };

  async function addReview() {
    const formData = new FormData();
    formData.append("name", plate.name);
    if (plate._id) {
      formData.append("_id", plate._id);
    }
    formData.append("imagefile", dishFile);
    formData.append("repeat", selectedRepeatOption);
    formData.append("comment", dishComment ? dishComment : "");
    formData.append("date", selectedDate);
    formData.append("restaurantString", JSON.stringify(restaurant));
    formData.append("visitName", visit.name ? visit.name : "");
    formData.append("visitDate", visit.date);
    if (visit._id) {
      formData.append("visitId", visit._id);
    }
    formData.append("dishRating", dishRating);
    setLoading(true);
    let response = null;
    try {
      response = await axios.post(`/plates`, formData, {
        headers: {
          authorization: user._id,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(-1);
    } catch (e) {
      console.log(e, "eee");
    }

    setLoading(false);
  }

  function cleanForm() {
    setDishComment("");
    setDishImage("");
    setDishFile("");
    setSearchTerm("");
    setSelectedDate(new Date().getTime());
    setSelectedRepeatOption(true);
  }

  async function updateReview() {
    setLoading(true);

    const formData = new FormData();
    formData.append("_id", plate._id);
    formData.append("imagefile", dishFile);
    formData.append("image", dishImage);
    formData.append("repeat", selectedRepeatOption);
    formData.append("comment", dishComment);
    formData.append("date", selectedDate);
    const response = await axios.put(`/review`, formData, {
      headers: {
        authorization: user._id,
        "Content-Type": "multipart/form-data",
      },
    });

    navigate(-1);
    setLoading(false);
  }

  async function loadPlatesOfRestaurant(restaurant) {
    const response = await axios.get(`/plates/restaurant`, {
      params: {
        restaurantPlaceId: restaurant.placeId,
      },
      headers: {
        authorization: user._id,
      },
    });
    return response.data;
  }

  async function loadPlatesToRestaurantSelected(restaurant) {
    setLoading(true);
    const plates = await loadPlatesOfRestaurant(restaurant);
    setPlatesToSelect(plates);
    setLoading(false);
  }

  function onAddPlate() {
    setPlate({ name: searchTerm });
    next(4);
  }

  function handlePlatePress(plate) {
    setPlate(plate);
    next(4);
  }

  function back() {
    setStep(step - 1);
  }

  function next() {
    setStep(step + 1);
  }

  function onBackHistory() {
    navigate(-1);
  }

  function selectRestautant(restaurantSelected) {
    setRestaurant(restaurantSelected);
    next();
    loadPlatesToRestaurantSelected(restaurantSelected);
  }

  function onChangeVisit(visit) {
    setVisit(visit);
    next();
  }

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "transparent",
        borderRadius: 8,
      }}
    >
      <Header
        onDeleteReview={onDeleteReview}
        step={step}
        back={back}
        onBackHistory={onBackHistory}
        from={from}
      />
      <View style={styles.modalContainer}>
        {step === 1 && <StepRestaurant selectRestautant={selectRestautant} />}
        {step === 2 && <StepVisit setVisit={onChangeVisit} />}
        {step === 3 && (
          <StepImage
            setDishImage={setDishImage}
            restaurant={restaurant}
            setDishFile={setDishFile}
            dishImage={dishImage}
            onContinue={() => {
              setStep(4);
            }}
          />
        )}
        {step === 4 && (
          <StepNamePlate
            platesToSelect={platesToSelect}
            searchTerm={searchTerm}
            onAddPlate={onAddPlate}
            handlePlatePress={handlePlatePress}
            setSearchTerm={setSearchTerm}
          />
        )}

        {step === 5 && (
          <StepSummary
            onSave={onSave}
            setDishImage={setDishImage}
            dishImage={dishImage}
            selectedRepeatOption={selectedRepeatOption}
            setSelectedRepeatOption={setSelectedRepeatOption}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            dishComment={dishComment}
            setDishComment={setDishComment}
            dishRating={dishRating}
            setDishRating={setDishRating}
            setDishFile={setDishFile}
            from={from}
          />
        )}
      </View>
      {<LoadingSpinner loading={loading} />}
    </div>
  );
};

const styles = {
  modalContent: {},
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingBottom: 80,
  },
};

export default NewPlate;

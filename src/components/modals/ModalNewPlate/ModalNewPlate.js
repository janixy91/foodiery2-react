import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import StepRestaurant from "./stepRestaurant";
import StepNamePlate from "./stepNamePlate";
import StepSummary from "./stepSummary";
import StepImage from "./stepImage";
import Header from "./header";
import View from "../../atoms/View";
import LoadingSpinner from "../../atoms/Loading";
import { useAuth } from "../../../hooks/useAuth";
import axios from "../../../utils/axios";

const ModalNewPlate = ({
  isVisible,
  toggleModal,
  onSavePlate,
  stepProps = 1,
  restaurantProps,
  plateProps,
  onDelete,
  onUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState(restaurantProps);
  const [plate, setPlate] = useState(plateProps);
  const [platesToSelect, setPlatesToSelect] = useState([]);
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [step, setStep] = useState(stepProps);

  const [dishComment, setDishComment] = useState(plateProps?.comment);
  const [selectedRepeatOption, setSelectedRepeatOption] = useState(
    plateProps?.repeat || true
  );
  const [dishImage, setDishImage] = useState(plateProps?.image);
  const [dishFile, setDishFile] = useState(plateProps?.image);
  const [selectedDate, setSelectedDate] = useState(
    plateProps?.date || new Date().getTime()
  );

  useEffect(() => {
    if (stepProps) {
      setStep(stepProps);
    }
  }, [stepProps]);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    if (restaurantProps && isVisible) {
      saveRestaurant(restaurantProps);
    }
  }, [restaurantProps, isVisible]);

  useEffect(() => {
    setPlate(plateProps);
    setDishComment(plateProps?.comment || "");
    setSelectedRepeatOption(plateProps ? plateProps.repeat : true);
    setDishImage(plateProps?.image || "");
    setSelectedDate(plateProps?.time || new Date().getTime());
  }, [plateProps, isVisible]);

  useEffect(() => {
    if (isVisible && !plateProps) {
      cleanForm();
      setPlatesToSelect([]);
      setRestaurant(null);
    }
  }, [isVisible]);

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
      onDelete();
    } catch (e) {}
    setLoading(false);
  }

  const onSave = async () => {
    if (plateProps) {
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
    formData.append("comment", dishComment);
    formData.append("date", selectedDate);
    formData.append("restaurantString", JSON.stringify(restaurant));
    setLoading(true);
    let response = null;
    try {
      response = await axios.post(`/plates`, formData, {
        headers: {
          authorization: user._id,
          "Content-Type": "multipart/form-data",
        },
      });
      onSavePlate(response.data);
    } catch (e) {
      console.log(e, "eee");
    }

    cleanForm();
    setStep(1);
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

    onSavePlate(response.data);
    cleanForm();
    setStep(1);
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

  async function saveRestaurant(restaurant) {
    setLoading(true);

    if (plateProps) {
      setStep(4);
    } else {
      setStep(2);
    }
    const plates = await loadPlatesOfRestaurant(restaurant);
    setRestaurant(restaurant);
    setPlatesToSelect(plates);
    setLoading(false);
  }

  function onAddPlate() {
    setPlate({ name: searchTerm });
    setStep(4);
  }

  function handlePlatePress(plate) {
    setPlate(plate);
    setStep(4);
  }

  function backToRestaurant() {
    setPlatesToSelect([]);
    setRestaurant(null);
    setSearchTerm("");
    back();
  }

  function back() {
    setStep(step - 1);
  }

  function backToPlate() {
    setPlate(null);
    setSearchTerm("");
    back();
  }

  return (
    <Modal isOpen={isVisible} onRequestClose={toggleModal}>
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
          restaurant={restaurant}
          restaurantProps={restaurantProps}
          plate={plate}
          plateProps={plateProps}
          toggleModal={toggleModal}
          backToRestaurant={backToRestaurant}
          backToPlate={backToPlate}
          back={back}
        />
        <View style={styles.modalContainer}>
          {step === 1 && <StepRestaurant saveRestaurant={saveRestaurant} />}
          {step === 2 && (
            <StepImage
              setDishImage={setDishImage}
              restaurant={restaurant}
              setDishFile={setDishFile}
              dishImage={dishImage}
              onContinue={() => {
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <StepNamePlate
              platesToSelect={platesToSelect}
              searchTerm={searchTerm}
              onAddPlate={onAddPlate}
              handlePlatePress={handlePlatePress}
              setSearchTerm={setSearchTerm}
            />
          )}

          {step === 4 && (
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
              plateProps={plateProps}
              setDishFile={setDishFile}
            />
          )}
        </View>
      </div>
      {<LoadingSpinner loading={loading} />}
    </Modal>
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

export default ModalNewPlate;

import React, { useCallback, useState } from "react";
import {
  MAIN_COLOR,
  OTHER_ORANGE,
  SECOND_COLOR2,
} from "../../../constants/colors";
import View from "../../atoms/View";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import { FaRegThumbsDown } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";
import DatePicker from "../../compositions/DatePicker";
import ImageInput from "./imageInput";

const StepSummary = ({
  onSave,
  dishImage,
  setDishImage,
  selectedRepeatOption,
  setSelectedRepeatOption,
  selectedDate,
  setSelectedDate,
  dishComment,
  setDishComment,
  setDishFile,
  setDishRating,
  dishRating,
  from,
}) => {
  const handleConfirm = (date) => {
    setSelectedDate(new Date(date).getTime());
    console.warn("A date has been picked: ", date);
  };

  const repeatRadioButtons = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 16,
        marginLeft: 16,
      }}
    >
      <div className="form-check">
        <label>
          <input
            type="radio"
            value={true}
            checked={selectedRepeatOption === true}
            onChange={() => setSelectedRepeatOption(true)}
            style={{ transform: "scale(1.7)" }}
          />

          <FaRegThumbsUp
            size={28}
            color={MAIN_COLOR}
            style={{ marginLeft: 10, top: 4, position: "relative" }}
          />
        </label>
      </div>
      <div className="form-check" style={{ marginLeft: 20 }}>
        <label>
          <input
            type="radio"
            value={false}
            checked={selectedRepeatOption === false}
            onChange={() => setSelectedRepeatOption(false)}
            style={{ transform: "scale(1.7)" }}
          />

          <FaRegThumbsDown
            size={28}
            color={OTHER_ORANGE}
            style={{ marginLeft: 10, top: 8, position: "relative" }}
          />
        </label>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1 }} keyboardVerticalOffset={0} behavior={"position"}>
      <Text
        style={{
          marginTop: 0,
          marginBottom: 12,
          display: "block",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Datos del plato
      </Text>
      {from === "edit" && <div></div>}
      <div>Nota del plato: {dishRating}</div>

      <input
        style={{ width: "100%", height: "60px" }}
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={dishRating}
        className="slider"
        onChange={(e) => {
          console.log(e.currentTarget.value);
          setDishRating(e.target.value);
        }}
      />
      {from === "edit" && (
        <>
          <Text style={{ marginTop: 0, marginBottom: 12, display: "block" }}>
            Foto del plato (opcional)
          </Text>
          <ImageInput
            setDishImage={setDishImage}
            setDishFile={setDishFile}
            dishImage={dishImage}
          />
        </>
      )}
      {/* Campo de repetirías (radio buttons) */}
      {/* <Text style={{ ...styles.modalLabel, marginTop: 0, display: "block" }}>
        ¿Repetirías?
      </Text>
      <View style={{ marginTop: 15 }}>{repeatRadioButtons()}</View> */}
      {/* Campo de comentario del plato (textarea) */}
      <Text style={styles.modalLabel}>Comentario </Text>
      <textarea
        style={styles.modalTextArea}
        placeholder="Deja un comentario para acordarte la próxima vez que vuelvas a este local."
        numberOfLines={4}
        onChange={(e) => setDishComment(e.target.value)}
        value={dishComment}
      />

      {/* Botón para agregar restaurante o plato */}
      <Button
        text={from === "edit" ? "Editar plato" : "Añadir plato"}
        onPress={onSave}
        className={"super-button"}
        style={{ marginBottom: 40 }}
      />
    </div>
  );
};

const styles = {
  modalLabel: {
    marginTop: 10,
  },
  modalTextArea: {
    borderColor: "#dddddd",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    marginTop: 10,
    height: 100,
    borderRadius: 8,
    width: "100%",
  },
};

export default StepSummary;

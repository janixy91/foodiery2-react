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
import TextInput from "../../atoms/TextInput";

const StepVisit = ({ setVisit }) => {
  const [name, setName] = useState();
  const [date, setDate] = useState(new Date());

  const handleConfirm = (date) => {
    setDate(new Date(date).getTime());
    console.warn("A date has been picked: ", date);
  };

  const renderDatePicker = () => {
    return (
      <View
        style={{
          marginTop: 8,
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <DatePicker onDateSelected={handleConfirm} selectedDate={date} />
        </View>
      </View>
    );
  };

  return (
    <div style={{ flex: 1 }} keyboardVerticalOffset={0} behavior={"position"}>
      <Text
        style={{
          marginTop: 0,
          marginBottom: 12,
          display: "block",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Nombre de la visita
        <Text
          style={{
            marginTop: 0,
            marginBottom: 12,
            marginLeft: 4,
            fontSize: "12px",
          }}
        >
          (ej. Cumpleaños de papá )
        </Text>
      </Text>

      <TextInput
        style={{
          ...styles.input,
          marginBottom: 0,
          flex: 1,
          border: "1px solid gray",
          width: "100%",
        }}
        placeholder={"Nombre de la visita"}
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <div>
        <Text
          style={{
            marginTop: 0,
            marginBottom: 12,
            marginTop: 30,
            display: "block",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Fecha
        </Text>
      </div>
      {renderDatePicker()}

      <Button
        className="super-button"
        text={"Continuar"}
        onPress={() => setVisit({ name, date })}
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

export default StepVisit;

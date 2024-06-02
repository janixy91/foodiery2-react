import React, { useState } from "react";
import Moment from "moment";
import View from "../atoms/View";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import { MAIN_COLOR } from "../../constants/colors";

const DatePicker = ({ onDateSelected, selectedDate }) => {
  const handleDatePick = () => {
    const options = {
      date: new Date(),
      mode: "date", // Puedes usar 'date', 'time', o 'datetime'
      androidTheme: 4, // Opcional, ajusta el tema de Android
    };

    window.datePicker.show(options, (date) => {
      if (date !== "cancel") {
        onDateSelected(date);
      }
    });
  };

  return (
    <View
      style={{
        marginTop: 8,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
      }}
    >
      <View>
        {!!selectedDate && (
          <Text>El {Moment(selectedDate).format("DD-MM-yyyy")}</Text>
        )}
      </View>
      <View>
        <Button
          onPress={handleDatePick}
          style={{
            backgroundColor: MAIN_COLOR,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          text="Cambiar fecha"
        ></Button>
      </View>
    </View>
  );
};

export default DatePicker;

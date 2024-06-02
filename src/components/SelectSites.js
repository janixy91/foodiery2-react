import React from "react";
import GooglePlacesAutocompleteWeb from "react-google-places-autocomplete";
import axios from "axios";
import { API_KEY } from "../constants/enviroment";

const SelectSites = ({ placeholder = "Nombre del restaurante", onSelect }) => {
  return (
    <GooglePlacesAutocompleteWeb
      autocompletionRequest={{
        types: ["restaurant", "food", "bar"],
        componentRestrictions: { country: "ES" },
      }}
      apiOptions={{ language: "es", region: "es" }}
      apiKey="AIzaSyD1Qtr6YuqM-pIEas7dX4FPmPYkWsM_zpg"
      onSelect={onSelect}
      selectProps={{
        onChange: onSelect,
        placeholder: placeholder,
        styles: {
          zIndex: 200,
          container: (defaultStyles) => {
            return {
              ...defaultStyles,
              zIndex: 200,
            };
          },

          control: (provided) => ({
            ...provided,
            ...styles.modalInput,
            borderRadius: 32,
            font: "14px -apple-system, BlinkMacSystemFont",
            zIndex: 200,
            borderWidth: 4,
            borderColor: "#efefef",
            background: "white",
            height: "60px",
            boxShadow: "10px 10px 9px -7px rgb(200 153 153)",
            paddingLeft: "12px",
          }),
          placeholder: (defaultStyles) => {
            return {
              ...defaultStyles,
              color: "#130d0d",
              fontFamily: "Chewy",
              fontSize: "18px",
            };
          },
          menu: (defaultStyles) => {
            return {
              ...defaultStyles,
              backgroundColor: "white",
              zIndex: 100,
            };
          },
        },
      }}
    />
  );
};

const styles = {
  listViewContainer: {
    position: "absolute",
    zIndex: 100,
    elevation: 3,
    top: 30,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    top: 20,
    zIndex: 100,
    elevation: 3,
    paddingHorizontal: 15,
  },
  modalInput: {
    height: 40,
    borderColor: "#dddddd",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
};

export default SelectSites;

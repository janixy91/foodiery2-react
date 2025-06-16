import React from "react";
import GooglePlacesAutocompleteWeb from "react-google-places-autocomplete";
import Text from "../../atoms/Text";
import Image from "../../atoms/Image";
import View from "../../atoms/View";
import { geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";
import SelectSites from "../../SelectSites";

const StepRestaurant = ({ selectRestautant }) => {
  const RestaurantImage = require("../../../assets/restaurant.jpg");

  // function onPressPlaceNative(data, details) {
  //   const regex = /,\s*([^,]+)$/;
  //   const match = details.vicinity ? details.vicinity.match(regex) : null;
  //   const ciudad = match ? match[1] : null;
  //   const restaurant = {
  //     name: details.name,
  //     description: details.editorial_summary?.overview,
  //     placeId: data.place_id,
  //     placeTypes: data.types,
  //     placeReference: data.reference,
  //     latitude: details.geometry ? details.geometry.location.lat : "",
  //     longitude: details.geometry ? details.geometry.location.lng : "",
  //     website: details.website,
  //     address_components: details.address_components,
  //     formatted_address: details.formatted_address,
  //     vicinity: details.vicinity,
  //     locality: ciudad,
  //   };
  //   selectRestautant(restaurant);
  // }

  function onPressPlaceWeb(data, a) {
    geocodeByPlaceId(data.value.place_id)
      .then((results) => {
        const locality = results[0].address_components.find((item) => {
          return item.types.find((subitem) => subitem === "locality");
        }).long_name;
        const restaurant = {
          name: data.value.structured_formatting.main_text,
          placeId: data.value.place_id,
          placeReference: data.value.reference,
          placeTypes: data.value.types,
          formatted_address: results[0].formatted_address,
          locality: locality,
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        };
        selectRestautant(restaurant);
      })
      .catch((error) => {
        const restaurant = {
          name: data.value.structured_formatting.main_text,
          placeId: data.value.place_id,
          placeReference: data.value.reference,
          placeTypes: data.value.types,
        };
        selectRestautant(restaurant);
      });
  }

  const handlePlaceSelect = ({ description, place_id }) => {
    console.log(description, place_id, "description, place_id");
  };

  return (
    <View>
      <Text
        style={{
          marginTop: 0,
          marginBottom: 12,
          marginTop: 12,
          display: "block",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        ¿Dónde ha sido la visita?
      </Text>
      <Text
        style={{
          marginTop: 6,
          fontSize: 14,
          marginBottom: 10,
          display: "block",
        }}
      >
        Escribe el nombre del restaurante/sitio y seleccionalo para avanzar al
        siguiente paso
      </Text>
      {/* {(Platform.OS === "ios" || Platform.OS === "android") && (
        <GooglePlacesAutocomplete
          listView={styles.listViewContainer}
          container={styles.searchContainer}
          placeholder="Nombre del restaurante"
          onPress={onPressPlaceNative}
          fetchDetails={true}
          listViewDisplayed={false}
          query={{
            key: "AIzaSyD1Qtr6YuqM-pIEas7dX4FPmPYkWsM_zpg",
            language: "es",
            components: "country:es",
          }}
          styles={{
            zIndex: 200,
            textInput: {
              height: 40,
              borderColor: "#dddddd",
              borderWidth: 2,
              borderRadius: 8,
            },
            container: (defaultStyles) => {
              return {
                ...defaultStyles,
                zIndex: 200,
              };
            },
            input: (defaultStyles) => {
              return {
                ...defaultStyles,
                margin: 0,
                borderColor: "#dddddd",
              };
            },
            control: (provided) => ({
              ...provided,
              ...styles.modalInput,
              borderRadius: 8,
              font: "14px -apple-system, BlinkMacSystemFont",
              zIndex: 200,
            }),
            placeholder: (defaultStyles) => {
              return {
                ...defaultStyles,
                color: "black",
              };
            },
            menu: (defaultStyles) => {
              return {
                ...defaultStyles,
                backgroundColor: "white",
                zIndex: 100,
              };
            },

            listView: {
              zIndex: 9500,
            },
          }}
        />
      )} */}
      <SelectSites
        placeholder="Busca un restaurante..."
        onSelect={onPressPlaceWeb}
      />
      {/* <GooglePlacesAutocompleteWeb
        autocompletionRequest={{
          country: ["es"],
        }}
        apiOptions={{ language: "es", region: "es" }}
        apiKey="AIzaSyD1Qtr6YuqM-pIEas7dX4FPmPYkWsM_zpg"
        onSelect={handlePlaceSelect}
        selectProps={{
          onChange: onPressPlaceWeb,
          placeholder: "Nombre del restaurante",
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
              borderRadius: 8,
              font: "14px -apple-system, BlinkMacSystemFont",
              zIndex: 200,
              borderWidth: 2,
              height: "60px",
            }),
            placeholder: (defaultStyles) => {
              return {
                ...defaultStyles,
                color: "black",
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
      /> */}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={RestaurantImage}
          style={{
            height: "auto",
            maxHeight: 300,
            maxWidth: 400,
            marginTop: 0,
            marginBottom: 10,
          }}
        />
      </div>
    </View>
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

export default StepRestaurant;

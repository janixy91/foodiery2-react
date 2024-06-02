import React from "react";
import { MAIN_COLOR, SECOND_COLOR2 } from "../../../constants/colors";
import ImagePicker from "../../compositions/ImagePicker";
import View from "../../atoms/View";
import Button from "../../atoms/Button";
import Image from "../../atoms/Image";
import Text from "../../atoms/Text";
import ImageInput from "./imageInput";

const StepImage = ({
  setDishImage,
  dishImage,
  onContinue,
  setDishFile,
  restaurant,
}) => {
  function onSkip() {
    setDishImage("");
    onContinue();
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            marginTop: 6,
            fontSize: 16,
            marginBottom: 10,
            display: "block",
          }}
        >
          Sube la imagen del plato que has probado en{" "}
          <Text
            style={{
              marginTop: 6,
              fontSize: 16,
              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            {restaurant?.name}{" "}
          </Text>
        </Text>

        <ImageInput
          setDishFile={setDishFile}
          setDishImage={setDishImage}
          dishImage={dishImage}
        />

        {/* {window.cordova && (
          <ImagePicker
            onImageSelected={(image) => {
              setDishImage(image);
            }}
          />
        )} */}
        {/* <Button
          text="Seleccionar foto"
          onPress={openImagePicker}
          style={{ flex: 1, marginRight: 5 }}
        />

        <Button
          text="Sacar foto"
          onPress={handleCameraPermission}
          style={{ flex: 1, marginLeft: 5 }}
        /> */}
      </View>
      {!dishImage && (
        <Button
          text="Saltar este paso"
          onPress={onSkip}
          background={SECOND_COLOR2}
          style={{ flex: 1, marginTop: 25 }}
        />
      )}
      {dishImage && (
        <View style={{ position: "relative" }}>
          {/* 
          <TouchableOpacity
            onPress={() => {
              setDishImage("");
            }}
            style={{
              backgroundColor: "rgb(224 123 123)",
              height: 22,
              width: "100%",
              marginTop: 4,
              textAlign: "center",
              borderRadius: 8,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiTwotoneDelete size={14} color="white" />
            <Text style={{ color: "white", marginLeft: 6 }}>Borrar foto</Text>
          </TouchableOpacity> */}
          <Button
            text="Continuar"
            onPress={onContinue}
            style={{ flex: 1, marginTop: 15 }}
            className={"super-button"}
          />
        </View>
      )}
    </>
  );
};

export default StepImage;

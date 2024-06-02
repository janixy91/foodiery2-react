import React from "react";
import Image from "../../atoms/Image";
import Button from "../../atoms/Button";
import { MdDeleteForever } from "react-icons/md";
import { MAIN_COLOR, OTHER_ORANGE } from "../../../constants/colors";
import { fontSize } from "@mui/system";

const ImageInput = ({ setDishImage, setDishFile, dishImage }) => {
  function onChangeFile(e) {
    setDishFile(e.target.files[0]);
    showImage(e.target.files[0]);
  }

  function showImage(file) {
    const imageUrl = URL.createObjectURL(file);
    setDishImage(imageUrl);
  }

  return (
    <div>
      {dishImage && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "white",
              position: "absolute",
              top: -14,
              right: 0,
              borderRadius: "100%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid grey",
            }}
          >
            <MdDeleteForever
              size={28}
              color={OTHER_ORANGE}
              style={{}}
              onClick={() => {
                setDishImage("");
                setDishFile("");
              }}
            />
          </div>
        </div>
      )}
      {dishImage && (
        <Image
          source={dishImage}
          style={{
            maxWidth: "100%",
            maxHeight: "400px",
            marginTop: 0,
            borderRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          resizeMode="cover"
        />
      )}
      {!dishImage && (
        <label for="fileInput" class="custom-file-input">
          <Button
            className={"super-button"}
            text={dishImage ? "Cambiar imagen" : "Subir imagen"}
            style={{
              backgroundColor: MAIN_COLOR,
              flex: 1,
              marginTop: 15,
              height: "60px",
              fontSize: "20px",
            }}
          />
        </label>
      )}
      <input
        type="file"
        id="fileInput"
        class="hidden-input"
        onChange={onChangeFile}
        name="imagefile"
        accept="image/*"
      />
    </div>
  );
};

export default ImageInput;

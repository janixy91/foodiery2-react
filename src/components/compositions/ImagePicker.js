import React, { useState } from "react";
import Button from "../atoms/Button";
import LoadingSpinner from "../atoms/Loading";

const ImagePicker = ({ onImageSelected }) => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  function fileUriToBase64(fileUri, callback) {
    window.resolveLocalFileSystemURL(
      fileUri,
      function (fileEntry) {
        fileEntry.file(function (file) {
          var reader = new FileReader();

          reader.onloadend = function () {
            // El resultado base64 estará en reader.result
            if (callback) {
              callback(reader.result);
            }
          };

          reader.readAsDataURL(file);
        });
      },
      function (error) {
        console.error("Error al resolver la URL del archivo:", error);
        if (callback) {
          callback(null);
        }
      }
    );
  }

  const handleImagePick = () => {
    setLoading(true);
    const options = {
      quality: 60,
      // eslint-disable-next-line
      destinationType: Camera.DestinationType.FILE_URI,
      // eslint-disable-next-line
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 400,
    };

    navigator.camera.getPicture(
      (data) => {
        setImageData(data);
        onImageSelected(data);
        // fileUriToBase64(data, function (base64) {
        //   if (base64) {
        //     setImageData(data);
        //     onImageSelected(base64);
        //     // Ahora puedes hacer lo que quieras con el base64, por ejemplo, enviarlo a un servidor
        //   } else {
        //     console.error("No se pudo convertir el archivo a base64.");
        //   }
        // });

        setLoading(false);
      },
      (error) => {
        console.error("Error selecting image: ", error);
        setLoading(false);
      },
      options
    );
  };

  const handlePhotoPick = () => {
    setLoading(true);
    const options = {
      quality: 60,
      // eslint-disable-next-line
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 400,
    };
    navigator.camera.getPicture(
      (data) => {
        setImageData(data);
        onImageSelected(data);

        // fileUriToBase64(data, function (base64) {
        //   if (base64) {
        //     setImageData(data);
        //     onImageSelected(base64);
        //     // Ahora puedes hacer lo que quieras con el base64, por ejemplo, enviarlo a un servidor
        //   } else {
        //     console.error("No se pudo convertir el archivo a base64.");
        //   }
        // });

        setLoading(false);
      },
      (error) => {
        console.error("Error selecting image: ", error);
        setLoading(false);
      },
      options
    );
  };

  return (
    <div>
      {/* {imageData && (
        <img src={imageData} alt="Selected" style={{ maxWidth: "100%" }} />
      )} */}
      {<LoadingSpinner loading={loading} />}
      <div>
        <Button text="Seleccionar foto" onPress={handleImagePick} />

        <Button
          text="Sacar foto"
          onPress={handlePhotoPick}
          style={{ marginTop: 12 }}
        />
      </div>
    </div>
  );
};

export default ImagePicker;

import React, { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";

const UseCameraHook = ({ setDishImage }) => {
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const openImagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setDishImage(result.assets[0].base64);
    }
  };

  const handleCameraPermission = useCallback(async () => {
    if (cameraStatus) {
      if (
        cameraStatus.status === ImagePicker.PermissionStatus.UNDETERMINED ||
        (cameraStatus.status === ImagePicker.PermissionStatus.DENIED &&
          cameraStatus.canAskAgain)
      ) {
        const permission = await requestCameraPermission();
        if (permission.granted) {
          await handleLaunchCamera();
        }
      } else if (cameraStatus.status === ImagePicker.PermissionStatus.DENIED) {
        await Linking.openSettings();
      } else {
        await handleLaunchCamera();
      }
    }
  }, [cameraStatus, handleLaunchCamera, requestCameraPermission]);

  const handleLaunchCamera = useCallback(async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setDishImage(result.assets[0].base64);
    }
  }, []);

  return { handleCameraPermission, openImagePicker };
};

export default UseCameraHook;

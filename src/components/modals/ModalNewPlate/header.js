import React from "react";
import { MAIN_COLOR, SECOND_COLOR2 } from "../../../constants/colors";
import View from "../../atoms/View";
import TouchableOpacity from "../../atoms/TouchableOpacity";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const Header = ({ onDeleteReview, step, onBackHistory, back, from }) => {
  const showConfirmDelete = () => {
    const confirmResult = window.confirm(
      "¿Estás seguro que quieres borrar este plato?"
    );

    if (confirmResult) {
      onDeleteReview();
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {((step === 2 && from == "home") ||
          ((step === 3 || step === 4) && from !== "edit")) && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              back();
            }}
          >
            <MdOutlineArrowBackIosNew size={24} color="white" />
          </TouchableOpacity>
        )}
        {from === "edit" && step === 4 && (
          <Button
            text="Borrar plato"
            background={"rgb(224 123 123)"}
            onPress={showConfirmDelete}
          />
        )}
        <Text style={styles.modalHeader} classname={"title"}>
          {from === "edit"
            ? "Editar plato"
            : step < 2
            ? "Nueva visita"
            : "Nuevo plato"}
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={onBackHistory}>
          <AiOutlineClose size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: MAIN_COLOR,
    width: "100%",
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingRight: 8,
  },
  subtitle: {
    marginTop: 16,
    overflow: "hidden",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    msTextOverflow: "ellipsis",
  },
  closeButton: {
    zIndex: 10,
  },
};

export default Header;

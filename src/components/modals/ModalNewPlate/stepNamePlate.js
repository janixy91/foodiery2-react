import React from "react";
import View from "../../atoms/View";
import Text from "../../atoms/Text";
import TextInput from "../../atoms/TextInput";
import Button from "../../atoms/Button";
import TouchableOpacity from "../../atoms/TouchableOpacity";

const StepNamePlate = ({
  platesToSelect,
  searchTerm,
  setSearchTerm,
  onAddPlate,
  handlePlatePress,
}) => {
  return (
    <View>
      <Text style={{ marginBottom: 16, marginTop: 0, display: "block" }}>
        {platesToSelect.length > 0
          ? "Selecciona el plato de la lista o añádelo si no lo encuentras"
          : "Indica el nombre del plato y añadelo"}
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ ...styles.input, marginBottom: 0, flex: 1 }}
          placeholder={
            platesToSelect.length > 0 ? "Nombre del plato" : "Nombre del plato"
          }
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />

        <Button
          text="Añadir"
          style={{
            marginLeft: 5,
            flex: 0,
            flexGrow: 0,
            flexShrink: 0,
          }}
          onPress={onAddPlate}
          disabled={!searchTerm}
        />
      </View>
      {platesToSelect.length > 0 && (
        <Text
          style={{
            marginBottom: 6,
            marginTop: 4,
            fontSize: 12,
          }}
        >
          Utiliza este campo para buscar en la lista o para añadir si no lo
          encuentras
        </Text>
      )}
      {platesToSelect.length > 0 && (
        <Text style={{ marginTop: 12, fontWeight: "bold", display: "block" }}>
          Lista de platos ya guardados del restaurante:
        </Text>
      )}
      <ul style={{ margin: 0, padding: 0 }}>
        {platesToSelect
          .filter((restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item) => {
            return (
              <TouchableOpacity onPress={() => handlePlatePress(item)}>
                <View style={styles.plateItem}>
                  <Text style={styles.plateName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ul>

      {platesToSelect.length > 0 &&
        platesToSelect.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <Text style={{ marginTop: 12 }}>
            No hay coincidencias con ese nombre
          </Text>
        )}
      {/* {!newPlate && (
                <MultiSelect
                  style={{
                    padding: 0,
                  }}
                  hideTags
                  items={platesToSelect}
                  uniqueKey="id"
                  selectedItems={selectedItems}
                  selectText="Busca o añade"
                  searchInputPlaceholderText="Buscar plato..."
                  // onChangeInput={(text) => console.log(text)}
                  // altFontFamily="ProximaNova-Light"
                  onSelectedItemsChange={onSelectedItemsChange}
                  onAddItem={onAddItem}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  styleMainWrapper={{ padding: 0 }}
                  styleDropdownMenu={{ padding: 0 }}
                  styleInputGroup={{ padding: 0 }}
                  styleItemsContainer={{ padding: 0 }}
                  styleListContainer={{ padding: 0 }}
                  styleRowList={{ padding: 0 }}
                  styleSelectorContainer={{ padding: 0 }}
                  // submitButtonColor="#CCC"
                  // submitButtonText="Submit"
                  canAddItems={true}
                  single={true}
                />
              )} */}
      {/* {newPlate && newPlate.name && (
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={{ ...styles.modalInput, flex: 1 }}
                    placeholder="Nombre del plato"
                    onChangeText={(text) =>
                      setNewPlate({ ...newPlate, name: text })
                    }
                    value={newPlate.name}
                  />
                  <TouchableOpacity onPress={onDeleteNewPlate}>
                    <FontAwesome
                      name="times"
                      size={24}
                      color="black"
                      style={{ marginLeft: 12 }}
                    />
                  </TouchableOpacity>
                </View>
              )} */}
    </View>
  );
};

const styles = {
  input: {
    width: "100%",
    height: 40,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderStyle: "solid",
  },
  plateItem: {
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    display: "flex",
  },
  plateName: {
    flex: 1,
  },
};

export default StepNamePlate;

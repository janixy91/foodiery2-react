import React from "react";
import View from "../../atoms/View";
import Text from "../../atoms/Text";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { SECOND_COLOR2 } from "../../../constants/colors";
import { TbEyeHeart } from "react-icons/tb";
import TouchableOpacity from "../../atoms/TouchableOpacity";

const RestaurantItem = ({ name, locality, plates, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View style={styles.restaurantItem}>
        <div>
          <Text style={styles.restaurantName} classname="supertitle">
            {name}
          </Text>
          <span
            style={{
              display: "block",
              fontSize: "12px",
              color: "gray",
            }}
          >
            {locality}
          </span>
        </div>

        {plates && plates.length > 0 && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText} classname="supertitle">
              {plates.length}
            </Text>
            <PiBowlFoodDuotone
              name="silverware-fork-knife"
              size={20}
              color={SECOND_COLOR2}
              style={{ position: "relative", top: "4px" }}
            />
          </View>
        )}

        {(!plates || plates.length === 0) && (
          <View style={styles.ratingContainer}>
            <TbEyeHeart size="24" color="gray" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  restaurantName: {
    paddingRight: 8,
  },
  restaurantItem: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    borderBottomStyle: "solid",
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 60,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: "0 0 auto",
  },
  ratingText: {
    marginRight: 4,
    color: SECOND_COLOR2,
    fontWeight: "bold",
  },
};

export default RestaurantItem;

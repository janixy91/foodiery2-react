import React, { useContext, useState } from "react";
import MyContext from "../../context/Context";
import useWhislits from "../../hooks/useWhislits";
import Header from "../../components/compositions/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MAIN_COLOR } from "../../constants/colors";
import RestaurantItem from "../../components/compositions/restaurantItem/RestaurantItem";

const Whislist = () => {
  const { ctxWhislist } = useContext(MyContext);
  const navigate = useNavigate();

  useWhislits();

  function onBack() {
    navigate(-1);
  }

  function goRestaurantDetail(restaurant) {
    navigate(`/restaurant-detail`, {
      state: { placeId: restaurant.placeId },
    });
  }

  return (
    <div className="wishlist">
      <Header
        left={
          <MdOutlineArrowBackIosNew
            onClick={onBack}
            size={20}
            color="white"
            style={{ position: "relative", top: 4 }}
          />
        }
        title={"Wishlist"}
        style={{ height: 60, backgroundColor: MAIN_COLOR, flex: "0 0 auto" }}
      />

      <ul className="wishlist-list">
        {ctxWhislist?.restaurants.map((item) => (
          <RestaurantItem {...item} onPress={() => goRestaurantDetail(item)} />
        ))}
      </ul>
    </div>
  );
};

export default Whislist;

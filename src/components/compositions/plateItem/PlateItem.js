import React from "react";
import { MAIN_COLOR } from "../../../constants/colors";
import moment from "moment";

const PlateItem = ({ image, name, comment, time, rating, onClick }) => {
  return (
    <div className="plate-item" onClick={onClick}>
      <div className="plate-item__top">
        <img src={image} className="plate-item__image" />

        <div className="plate-item__right">
          <span className="plate-item__name">{name}</span>
          <span className="plate-item__time">
            El {moment(time).format("DD-MM-yyyy")}
          </span>
        </div>
      </div>
      <span className="plate-item__comment">{comment}</span>
      <div
        className="plate-item__rating"
        style={{ background: rating < 5 ? "#f34141" : MAIN_COLOR }}
      >
        {rating}
      </div>
    </div>
  );
};

export default PlateItem;

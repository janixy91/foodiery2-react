import React from "react";
import { BsPatchCheck } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import DynamicComponent from "../Dynamic";

const Award = ({ icon, text, active }) => {
  return (
    <div className={`award ${active ? "award--active" : ""}`}>
      <div className={`award__circle ${active ? "award__circle--active" : ""}`}>
        <div className="award__icon">
          <DynamicComponent componentString={icon} />
          <div className="award__check">
            <FaCheck color="green" size={20} />
          </div>
        </div>
      </div>
      <span className="award__text">{text}</span>
    </div>
  );
};

export default Award;

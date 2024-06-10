import React from "react";
import { TbNumber1Small } from "react-icons/tb";
import { TbNumber5Small } from "react-icons/tb";
import { FaBowlFood } from "react-icons/fa6";
import { BsBalloonHeartFill } from "react-icons/bs";
const DynamicComponent = ({ componentString }) => {
  const components = {
    FaBowlFood: FaBowlFood,
    BsBalloonHeartFill,
    TbNumber5Small,
    TbNumber1Small,
  };

  const getComponentFromString = (str) => {
    const matches = str.match(/<(\w+).*size={(\d+)}.*\/>/);
    if (matches && matches.length === 3) {
      const Component = components[matches[1]];
      const size = parseInt(matches[2], 10);
      if (Component) {
        return <Component size={size} />;
      }
    }
    return null;
  };

  return <div>{getComponentFromString(componentString)}</div>;
};

export default DynamicComponent;

import React, { useState } from "react";
import MyContext from "./Context";

const MyProvider = ({ children }) => {
  const [value, setValue] = useState("valor inicial");
  const [ctxRestaurants, setCtxRestaurants] = useState([]);
  const [ctxWhislist, setCtxWhislist] = useState([]);

  return (
    <MyContext.Provider
      value={{ ctxRestaurants, setCtxRestaurants, ctxWhislist, setCtxWhislist }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;

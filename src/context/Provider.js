import React, { useState } from "react";
import MyContext from "./Context";

const MyProvider = ({ children }) => {
  const [value, setValue] = useState("valor inicial");
  const [ctxRestaurants, setCtxRestaurants] = useState([]);
  const [ctxWhislist, setCtxWhislist] = useState({
    plates: [],
    restaurants: [],
  });
  const [ctxUser, setCtxUser] = useState(null);
  const [ctxSeason, setCtxSeason] = useState(null);

  return (
    <MyContext.Provider
      value={{
        ctxRestaurants,
        setCtxRestaurants,
        ctxWhislist,
        setCtxWhislist,
        ctxUser,
        setCtxUser,
        setCtxSeason,
        ctxSeason,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;

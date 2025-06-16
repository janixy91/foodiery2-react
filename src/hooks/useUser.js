import MyContext from "../context/Context";
import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "./useAuth";

const useUser = () => {
  const { setCtxUser } = useContext(MyContext);
  const { user } = useAuth();

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const response = await axios.get(`/users`, {
        headers: {
          authorization: user?._id,
        },
      });
      setCtxUser(response.data);
    } catch (e) {}
  }

  return <div></div>;
};

export default useUser;

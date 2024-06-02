import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "./useAuth";
import MyContext from "../context/Context";

const useRestaurants = () => {
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user: session } = useAuth();
  const [error, setError] = useState(false);
  const { setCtxRestaurants, ctxRestaurants } = useContext(MyContext);

  useEffect(() => {
    loadRestaurants();
  }, []);

  async function loadRestaurants() {
    if (ctxRestaurants.length === 0) {
      setLoad(false);
      setLoading(true);
      try {
        const response = await axios.get(`/restaurants/allInfo`, {
          headers: {
            authorization: session?._id,
          },
        });

        setCtxRestaurants(response.data);
        setError(false);
      } catch (e) {
        setError(true);
      }
      setLoad(true);
      setLoading(false);
    }
  }
  return { load, loading, error, loadRestaurants };
};

export default useRestaurants;

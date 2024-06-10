import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "./useAuth";
import MyContext from "../context/Context";

const useWhislits = () => {
  const [loading, setLoading] = useState(false);
  const { user: session } = useAuth();
  const { ctxWhislist, setCtxWhislist } = useContext(MyContext);

  useEffect(() => {
    loadWhislist();
  }, []);

  async function loadWhislist() {
    setLoading(true);
    try {
      const response = await axios.get(`/whislist`, {
        headers: {
          authorization: session?._id,
        },
      });
      setCtxWhislist(response.data);
    } catch (e) {
      console.log(e)
    }
    setLoading(false);
  }


  function isInWhislist(placeId) {
    return !!ctxWhislist.restaurants.find(item => item.placeId === placeId)
  }

  async function addWhislist(restaurant) {
    setLoading(true);
    try {
      
      const response = await axios.post(`/whislist`, {placeId: restaurant.placeId, restaurantString: JSON.stringify(restaurant)}, {
        headers: {
          authorization: session?._id,
        },
      });


      await loadWhislist()
      return response.data.awards

    } catch (e) {
      console.log(e)
    }
    setLoading(false);
  }

  async function deleteWhislist(restaurant) {
    setLoading(true);
    try {
      const response = await axios.delete(`/whislist`, {params: {placeId: restaurant.placeId},   headers: {
        authorization: session?._id
      }});

      loadWhislist()
    } catch (e) {
      console.log(e)
    }
    setLoading(false);
  }

  async function deleteAndRefreshWishlist() {
    setCtxWhislist({
      plates: [],
      restaurants: [],
    });
    loadWhislist()
  }
  return {  loading, loadWhislist, addWhislist, isInWhislist, deleteWhislist};
};

export default useWhislits;

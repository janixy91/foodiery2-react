import MyContext from "../context/Context";
import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "./useAuth";

const useSeason = () => {
  const { setCtxSeason, ctxUser, ctxSeason } = useContext(MyContext);
  const { user } = useAuth();

  useEffect(() => {
    loadSeason();
  }, []);

  function hasUserAward(awardId) {
    return ctxUser.awards?.find((item) => item === awardId);
  }

  const userHasAllAwards = () => {
    const userAwardIds = ctxUser?.awards;
    return ctxSeason?.awards?.every((seasonAward) => {
      return userAwardIds.includes(seasonAward._id);
    });
  };

  async function loadSeason() {
    try {
      const response = await axios.get(`/season/current`, {
        headers: {
          authorization: user?._id,
        },
      });
      setCtxSeason(response.data);
    } catch (e) {}
  }

  return { hasUserAward, userHasAllAwards };
};

export default useSeason;

import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/Context";
import useWhislits from "../../hooks/useWhislits";
import Header from "../../components/compositions/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MAIN_COLOR } from "../../constants/colors";
import Award from "../../components/atoms/award/Award";
import useUser from "../../hooks/useUser";
import useSeason from "../../hooks/useSeason";
import PlateItem from "../../components/compositions/plateItem/PlateItem";
import axios from "../../utils/axios";

const Awards = () => {
  const navigate = useNavigate();
  useUser();
  const { ctxUser } = useContext(MyContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  function onBack() {
    navigate(-1);
  }
  useEffect(() => {
    loadPlatesRanking();
  }, []);

  async function loadPlatesRanking() {
    setLoading(true);
    const response = await axios.get(`/plates/ranking`, {
      headers: {
        authorization: ctxUser._id,
      },
    });
    setReviews(response.data);
    setLoading(false);
  }

  function onEditPlate(plate) {
    navigate("/create-plate", {
      state: {
        restaurant: plate.restaurant,
        step: 4,
        from: "edit",
        plate: plate.plate,
      },
    });
  }

  return (
    <div className="plates">
      <Header
        left={
          <MdOutlineArrowBackIosNew
            onClick={onBack}
            size={20}
            color="white"
            style={{ position: "relative", top: 4 }}
          />
        }
        title={"Top 10 de platos "}
        style={{ height: 60, backgroundColor: MAIN_COLOR, flex: "0 0 auto" }}
      />
      <div className="plates__container">
        <ul style={{ margin: 0, padding: 0 }}>
          {reviews.map((item, index) => {
            console.log(item, "item");
            return (
              <div className="plates__item">
                <PlateItem
                  {...item.plate}
                  rating={item.rating}
                  comment={item.comment}
                  image={item.image}
                  restaurant={item.restaurant.name}
                />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Awards;

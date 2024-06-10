import React, { useContext, useState } from "react";
import MyContext from "../../context/Context";
import useWhislits from "../../hooks/useWhislits";
import Header from "../../components/compositions/Header";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MAIN_COLOR } from "../../constants/colors";
import { determinarRolYnivel } from "../../constants/roles";
import Award from "../../components/atoms/award/Award";
import TemporadaCronometro from "../../components/atoms/cronometer/Cronometer";
import useUser from "../../hooks/useUser";
import useSeason from "../../hooks/useSeason";

const Awards = () => {
  const navigate = useNavigate();
  useUser();
  const { hasUserAward, userHasAllAwards } = useSeason();
  const { ctxUser, ctxSeason } = useContext(MyContext);

  useWhislits();

  function onBack() {
    navigate(-1);
  }

  function goRestaurantDetail(restaurant) {
    navigate(`/restaurant-detail`, {
      state: { placeId: restaurant.placeId },
    });
  }

  return (
    <div className="awards">
      <Header
        left={
          <MdOutlineArrowBackIosNew
            onClick={onBack}
            size={20}
            color="white"
            style={{ position: "relative", top: 4 }}
          />
        }
        title={"Nivel y premios"}
        style={{ height: 60, backgroundColor: MAIN_COLOR, flex: "0 0 auto" }}
      />
      <div className="awards__container">
        <div className="awards__top">
          <div
            class="awards__image"
            style={{ backgroundImage: `url("/stars.png")` }}
          ></div>
          <div>
            <span class="awards__level">
              Nivel: {determinarRolYnivel(ctxUser?.score).nombre}
              <span class="awards__level">
                {" "}
                {determinarRolYnivel(ctxUser?.score).nivel}
              </span>
            </span>
            <span class="awards__points">Puntos: {ctxUser?.score} </span>
          </div>
        </div>
        <div className="awards__awards">
          <span className="awards__title">Premios</span>
          <div className="awards__temporada">
            <span className="awards__temporada-text">
              {!userHasAllAwards() && (
                <span>
                  ¡Consigue todos los premios antes de que se acabe la
                  temporada! Se acaba en:{" "}
                </span>
              )}
              {userHasAllAwards() && <span>La temporada se acaba en:</span>}
              {ctxSeason && (
                <div className="awards__temporada-cronometer">
                  <TemporadaCronometro
                    fechaFin={new Date(ctxSeason?.season?.endDate)}
                  />
                </div>
              )}
            </span>
          </div>
          <div className="awards__awards-list">
            {ctxSeason?.awards.map((item) => (
              <div className="awards__award">
                <Award
                  active={hasUserAward(item._id)}
                  text={item.name}
                  icon={item.html}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;

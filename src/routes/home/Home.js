import SelectSites from "../../components/SelectSites";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { RiRestaurantFill } from "react-icons/ri";
import useRestaurants from "../../hooks/useRestaurants";
import useWhislits from "../../hooks/useWhislits";
import { FaUserLarge } from "react-icons/fa6";
import TouchableOpacity from "../../components/atoms/TouchableOpacity";
import { determinarRolYnivel } from "../../constants/roles";
import { useAuth } from "../../hooks/useAuth";
import TemporadaCronometro from "../../components/atoms/cronometer/Cronometer";
import useUser from "../../hooks/useUser";
import React, { useContext, useState } from "react";
import MyContext from "../../context/Context";
import useSeason from "../../hooks/useSeason";

const Home = () => {
  const navigate = useNavigate();
  useRestaurants();
  useWhislits();
  useUser();
  const { ctxUser, ctxSeason } = useContext(MyContext);
  const { userHasAllAwards } = useSeason();

  function onGoProfile() {
    navigate("/profile");
  }

  function goAwards() {
    navigate("/awards");
  }

  function goVisited() {
    navigate("/visited");
  }

  function goWishlist() {
    navigate("/wishlist");
  }

  function goNewVisit() {
    navigate("/create-plate", {
      state: { step: 1, from: "home" },
    });
  }

  function onSelectRestaurante(restaurant) {
    navigate(`/restaurant-detail`, {
      state: { placeId: restaurant.value.place_id },
    });
  }
  function onGoProfile() {
    navigate("/profile");
  }

  function onGoPlates() {
    navigate("/plates");
  }
  return (
    <div className="home">
      <div className="home__header">
        <div class="home__perfil">
          <div
            onClick={goAwards}
            class="home__star-img"
            style={{ backgroundImage: `url("/stars.png")` }}
          >
            {!userHasAllAwards() && ctxSeason?.season?.endDate && (
              <div class="home__cronometer">
                <TemporadaCronometro
                  fechaFin={new Date(ctxSeason?.season?.endDate)}
                />
              </div>
            )}
          </div>

          {/* <img class="home__option-img" src="/perfil3.png" /> */}
          <span class="home__option-text">
            {determinarRolYnivel(ctxUser?.score).nombre}
            <span class="home__option-text">
              {" "}
              {determinarRolYnivel(ctxUser?.score).nivel}
            </span>
          </span>

          <div class="home__footer-icon">
            <TouchableOpacity onPress={() => onGoProfile()}>
              <FaUserLarge
                name="user"
                size={22}
                color="burlywood"
                // style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          </div>
        </div>
      </div>
      {/* <Autocomplete
        apiKey={API_KEY}
        onPlaceSelected={(place) => console.log(place)}
      /> */}
      {/* <PlacesSearch /> */}
      <div class="home__options">
        <div className="home__header-select">
          <SelectSites
            placeholder="Busca un restaurante..."
            onSelect={onSelectRestaurante}
          />
        </div>
        {/* <span class="home__options-title">
          <span class="home__options-title-text">Restaurantes</span>
          <RiRestaurantFill />
        </span> */}
        <div class="home__options-container">
          <div class="home__option" onClick={goVisited}>
            <img class="home__option-img" src="/visited.png" />
            <span class="home__option-text"> Visitados</span>
          </div>
          <div class="home__option" onClick={onGoPlates}>
            <img class="home__option-img" src="/plate.png" />
            <span class="home__option-text">Platos</span>
          </div>
          <div class="home__option" onClick={goWishlist}>
            <img class="home__option-img" src="/whislist.png" />
            <span class="home__option-text">Whislist</span>
          </div>
        </div>
      </div>
      <div class="home__footer">
        <Button
          onPress={goNewVisit}
          text={
            <div class="home__button-add">
              <MdOutlineAddLocationAlt
                size={24}
                color="white"
                style={{ marginLeft: 8 }}
              />
              <span class="home__button-add-text">¡Nueva visita!</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Home;

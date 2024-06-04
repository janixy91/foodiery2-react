import React from "react";
import SelectSites from "../../components/SelectSites";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { RiRestaurantFill } from "react-icons/ri";
import PlacesSearch from "../../components/compositions/PlacesSearch/PlacesSearch";
import Autocomplete from "react-google-autocomplete";
import { API_KEY } from "../../constants/enviroment";
import useRestaurants from "../../hooks/useRestaurants";
import useWhislits from "../../hooks/useWhislits";

const Home = () => {
  const navigate = useNavigate();
  useRestaurants();
  useWhislits();

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

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header-select">
          <SelectSites
            placeholder="Busca un restaurante..."
            onSelect={onSelectRestaurante}
          />
        </div>
      </div>
      {/* <Autocomplete
        apiKey={API_KEY}
        onPlaceSelected={(place) => console.log(place)}
      /> */}
      {/* <PlacesSearch /> */}
      <div class="home__options">
        <span class="home__options-title">
          <span class="home__options-title-text">Restaurantes</span>
          <RiRestaurantFill />
        </span>
        <div class="home__options-container">
          <div class="home__option" onClick={goVisited}>
            <img class="home__option-img" src="/visited.png" />
            <span class="home__option-text"> Visitados</span>
          </div>
          <div class="home__option">
            <img class="home__option-img" src="/explorar.png" />
            <span class="home__option-text">Explorar</span>
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

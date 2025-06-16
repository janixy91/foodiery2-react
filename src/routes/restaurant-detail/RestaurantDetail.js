import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../constants/enviroment";
import Carrusel from "../../components/carrusel/Carrusel";
import { MdOutlineWrongLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbMapPinHeart } from "react-icons/tb";
import Button from "../../components/atoms/Button";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import Header from "../../components/compositions/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import useWhislits from "../../hooks/useWhislits";
import useRestaurants from "../../hooks/useRestaurants";
import { PiBowlFoodDuotone } from "react-icons/pi";
import AwardModal from "../../components/modals/awardModal/AwardModal";

const RestaurantDetail = () => {
  const location = useLocation();
  const [photos, setPhotos] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [visited, noVisited] = useState(false);
  const navigate = useNavigate();
  const { addWhislist, isInWhislist, deleteWhislist } = useWhislits();
  const apiKey = API_KEY; // Reemplaza con tu clave API de Google
  const { isVisited, createRestaurant } = useRestaurants();
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    // en fields se puede poner * para que vengan todos.
    const response = await axios.get(
      // `https://places.googleapis.com/v1/places/${location.state.placeId}?fields=*`,
      `https://places.googleapis.com/v1/places/${location.state.placeId}?fields=id,displayName,addressComponents,primaryType,types,location,photos,formattedAddress`,
      {
        params: {
          key: API_KEY, // Reemplaza 'YOUR_API_KEY' con tu clave API de Google
        },
      }
    );

    const locality = response.data.addressComponents.find((item) => {
      return item.types.find((subitem) => subitem === "locality");
    }).longText;
    const restaurant = {
      name: response.data.displayName.text,
      placeId: response.data.id,
      placeReference: response.data.id,
      placeTypes: response.data.types,
      photos: response.data.photos,
      primaryType: response.data.primaryType,
      formatted_address: response.data.formattedAddress,
      locality: locality,
      latitude: response.data.location.latitude,
      longitude: response.data.location.longitude,
      address_components: response.data.addressComponents,
    };

    const restaurantModel = await createRestaurant(
      restaurant,
      response.data.id
    );
    setRestaurant(restaurantModel.restaurantModel);

    // const response = {
    //   data: {
    //     name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc",
    //     id: "ChIJ7R2jtOZbTg0RpGUzXA5jBnc",
    //     types: [
    //       "japanese_restaurant",
    //       "sushi_restaurant",
    //       "restaurant",
    //       "food",
    //       "point_of_interest",
    //       "establishment",
    //     ],
    //     nationalPhoneNumber: "944 65 01 71",
    //     internationalPhoneNumber: "+34 944 65 01 71",
    //     formattedAddress:
    //       "Andrés Cortina Kalea, 4, 48991 Getxo, Bizkaia, España",
    //     addressComponents: [
    //       {
    //         longText: "4",
    //         shortText: "4",
    //         types: ["street_number"],
    //         languageCode: "es-ES",
    //       },
    //       {
    //         longText: "Andrés Cortina Kalea",
    //         shortText: "Andrés Cortina Kalea",
    //         types: ["route"],
    //         languageCode: "eu",
    //       },
    //       {
    //         longText: "Getxo",
    //         shortText: "Getxo",
    //         types: ["locality", "political"],
    //         languageCode: "eu",
    //       },
    //       {
    //         longText: "Bizkaia",
    //         shortText: "BI",
    //         types: ["administrative_area_level_2", "political"],
    //         languageCode: "eu",
    //       },
    //       {
    //         longText: "Euskadi",
    //         shortText: "PV",
    //         types: ["administrative_area_level_1", "political"],
    //         languageCode: "eu",
    //       },
    //       {
    //         longText: "España",
    //         shortText: "ES",
    //         types: ["country", "political"],
    //         languageCode: "es",
    //       },
    //       {
    //         longText: "48991",
    //         shortText: "48991",
    //         types: ["postal_code"],
    //         languageCode: "es-ES",
    //       },
    //     ],
    //     plusCode: {
    //       globalCode: "8CMR9X2Q+P2",
    //       compoundCode: "9X2Q+P2 Getxo, España",
    //     },
    //     location: {
    //       latitude: 43.3517625,
    //       longitude: -3.0124865,
    //     },
    //     viewport: {
    //       low: {
    //         latitude: 43.3504476697085,
    //         longitude: -3.013872380291502,
    //       },
    //       high: {
    //         latitude: 43.3531456302915,
    //         longitude: -3.011174419708498,
    //       },
    //     },
    //     rating: 4.4,
    //     googleMapsUri: "https://maps.google.com/?cid=8576651453701252516",
    //     websiteUri: "http://www.nikkou.es/",
    //     regularOpeningHours: {
    //       openNow: false,
    //       periods: [
    //         {
    //           open: {
    //             day: 0,
    //             hour: 12,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 0,
    //             hour: 16,
    //             minute: 30,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 0,
    //             hour: 19,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 0,
    //             hour: 23,
    //             minute: 0,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 1,
    //             hour: 12,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 1,
    //             hour: 16,
    //             minute: 30,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 1,
    //             hour: 19,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 1,
    //             hour: 23,
    //             minute: 30,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 3,
    //             hour: 12,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 3,
    //             hour: 16,
    //             minute: 30,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 3,
    //             hour: 19,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 3,
    //             hour: 23,
    //             minute: 30,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 4,
    //             hour: 12,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 4,
    //             hour: 16,
    //             minute: 30,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 4,
    //             hour: 19,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 4,
    //             hour: 23,
    //             minute: 30,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 5,
    //             hour: 12,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 5,
    //             hour: 16,
    //             minute: 0,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 5,
    //             hour: 19,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 6,
    //             hour: 0,
    //             minute: 0,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 6,
    //             hour: 12,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 6,
    //             hour: 16,
    //             minute: 0,
    //           },
    //         },
    //         {
    //           open: {
    //             day: 6,
    //             hour: 19,
    //             minute: 30,
    //           },
    //           close: {
    //             day: 0,
    //             hour: 0,
    //             minute: 0,
    //           },
    //         },
    //       ],
    //       weekdayDescriptions: [
    //         "lunes: 12:30–16:30, 19:30–23:30",
    //         "martes: Cerrado",
    //         "miércoles: 12:30–16:30, 19:30–23:30",
    //         "jueves: 12:30–16:30, 19:30–23:30",
    //         "viernes: 12:30–16:00, 19:30–24:00",
    //         "sábado: 12:30–16:00, 19:30–24:00",
    //         "domingo: 12:30–16:30, 19:30–23:00",
    //       ],
    //     },
    //     utcOffsetMinutes: 120,
    //     adrFormatAddress:
    //       '<span class="street-address">Andrés Cortina Kalea, 4</span>, <span class="postal-code">48991</span> <span class="locality">Getxo</span>, <span class="region">Bizkaia</span>, <span class="country-name">España</span>',
    //     businessStatus: "OPERATIONAL",
    //     priceLevel: "PRICE_LEVEL_MODERATE",
    //     userRatingCount: 1093,
    //     iconMaskBaseUri:
    //       "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    //     iconBackgroundColor: "#FF9E67",
    //     displayName: {
    //       text: "Restaurante Japonés - NIKKOU",
    //       languageCode: "es",
    //     },
    //     primaryTypeDisplayName: {
    //       text: "Restaurante japonés",
    //       languageCode: "es-ES",
    //     },
    //     takeout: true,
    //     delivery: true,
    //     dineIn: true,
    //     reservable: true,
    //     servesBreakfast: false,
    //     servesLunch: true,
    //     servesDinner: true,
    //     servesBeer: true,
    //     servesWine: true,
    //     servesBrunch: true,
    //     servesVegetarianFood: true,
    //     currentOpeningHours: {
    //       openNow: false,
    //       periods: [
    //         {
    //           open: {
    //             day: 0,
    //             hour: 12,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 2,
    //             },
    //           },
    //           close: {
    //             day: 0,
    //             hour: 16,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 2,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 0,
    //             hour: 19,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 2,
    //             },
    //           },
    //           close: {
    //             day: 0,
    //             hour: 23,
    //             minute: 0,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 2,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 1,
    //             hour: 12,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 3,
    //             },
    //           },
    //           close: {
    //             day: 1,
    //             hour: 16,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 3,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 1,
    //             hour: 19,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 3,
    //             },
    //           },
    //           close: {
    //             day: 1,
    //             hour: 23,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 3,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 3,
    //             hour: 12,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 5,
    //             },
    //           },
    //           close: {
    //             day: 3,
    //             hour: 16,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 5,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 3,
    //             hour: 19,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 5,
    //             },
    //           },
    //           close: {
    //             day: 3,
    //             hour: 23,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 5,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 4,
    //             hour: 12,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 6,
    //             },
    //           },
    //           close: {
    //             day: 4,
    //             hour: 16,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 6,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 4,
    //             hour: 19,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 6,
    //             },
    //           },
    //           close: {
    //             day: 4,
    //             hour: 23,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 6,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 5,
    //             hour: 12,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 7,
    //             },
    //           },
    //           close: {
    //             day: 5,
    //             hour: 16,
    //             minute: 0,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 7,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 5,
    //             hour: 19,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 7,
    //             },
    //           },
    //           close: {
    //             day: 5,
    //             hour: 23,
    //             minute: 59,
    //             truncated: true,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 7,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 6,
    //             hour: 12,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 1,
    //             },
    //           },
    //           close: {
    //             day: 6,
    //             hour: 16,
    //             minute: 0,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 1,
    //             },
    //           },
    //         },
    //         {
    //           open: {
    //             day: 6,
    //             hour: 19,
    //             minute: 30,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 1,
    //             },
    //           },
    //           close: {
    //             day: 0,
    //             hour: 0,
    //             minute: 0,
    //             date: {
    //               year: 2024,
    //               month: 6,
    //               day: 2,
    //             },
    //           },
    //         },
    //       ],
    //       weekdayDescriptions: [
    //         "lunes: 12:30–16:30, 19:30–23:30",
    //         "martes: Cerrado",
    //         "miércoles: 12:30–16:30, 19:30–23:30",
    //         "jueves: 12:30–16:30, 19:30–23:30",
    //         "viernes: 12:30–16:00, 19:30–24:00",
    //         "sábado: 12:30–16:00, 19:30–24:00",
    //         "domingo: 12:30–16:30, 19:30–23:00",
    //       ],
    //     },
    //     primaryType: "japanese_restaurant",
    //     shortFormattedAddress: "C. Andrés Cortina, 4, Getxo",
    //     reviews: [
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/reviews/ChdDSUhNMG9nS0VJQ0FnSUNUMmUybTZnRRAB",
    //         relativePublishTimeDescription: "Hace 2 semanas",
    //         rating: 5,
    //         text: {
    //           text: "¡Me encanta este restaurante! He ido en varias ocasiones, nunca defrauda.\nMuy buen producto y atención siempre estupenda.",
    //           languageCode: "es",
    //         },
    //         originalText: {
    //           text: "¡Me encanta este restaurante! He ido en varias ocasiones, nunca defrauda.\nMuy buen producto y atención siempre estupenda.",
    //           languageCode: "es",
    //         },
    //         authorAttribution: {
    //           displayName: "Andrea Rguez",
    //           uri: "https://www.google.com/maps/contrib/102775692450563184412/reviews",
    //           photoUri:
    //             "https://lh3.googleusercontent.com/a-/ALV-UjWzYeffQ56GSgzV1ALPQaz_nuqWv3kp92OLVLb1LomX0Wbs2hkL=s128-c0x00000000-cc-rp-mo",
    //         },
    //         publishTime: "2024-05-16T17:50:48Z",
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/reviews/ChdDSUhNMG9nS0VJQ0FnSURsM2R2WDV3RRAB",
    //         relativePublishTimeDescription: "Hace 6 meses",
    //         rating: 4,
    //         text: {
    //           text: "Le daría un 7/10. Fuimos a cenar, y la verdad que tenía mejores expectativas.\n\nLa comida estaba bastante rica (aunque he probado sushis mejores) pero las raciones son un escasas para el precio que tiene. Pagamos unos 35€ por cabeza (precio razonable) pero comimos poco.\n\nEl ambiente es un tanto caótico, ya que hay bastante ruido y con poco espacio en las mesas para los trabajadores.\n\nRespecto al servicio, fue muy bueno. La chica fue encantadora y los platos salieron bastante rápido.",
    //           languageCode: "es",
    //         },
    //         originalText: {
    //           text: "Le daría un 7/10. Fuimos a cenar, y la verdad que tenía mejores expectativas.\n\nLa comida estaba bastante rica (aunque he probado sushis mejores) pero las raciones son un escasas para el precio que tiene. Pagamos unos 35€ por cabeza (precio razonable) pero comimos poco.\n\nEl ambiente es un tanto caótico, ya que hay bastante ruido y con poco espacio en las mesas para los trabajadores.\n\nRespecto al servicio, fue muy bueno. La chica fue encantadora y los platos salieron bastante rápido.",
    //           languageCode: "es",
    //         },
    //         authorAttribution: {
    //           displayName: "Mikel Arteaga",
    //           uri: "https://www.google.com/maps/contrib/105293917039005364592/reviews",
    //           photoUri:
    //             "https://lh3.googleusercontent.com/a-/ALV-UjXuQ54cR2tKVfXqDRRM5EKaCVFDPgJA0fxhhJ1rwZNFwoQbvYTQkw=s128-c0x00000000-cc-rp-mo",
    //         },
    //         publishTime: "2023-12-03T09:55:01Z",
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/reviews/ChdDSUhNMG9nS0VJQ0FnSUQ5ak9DVGp3RRAB",
    //         relativePublishTimeDescription: "Hace 2 meses",
    //         rating: 5,
    //         text: {
    //           text: "Sin duda el mejor sushi que hemos probado hasta el momento!\nSi tuviera que elegir una recomendación sería el tartar de atún con huevo y trufa y el nigiri de vieira, pero cualquiera de los platos es exquisito.\nAdemás tanto el trato como ambiente nos ha resultado excelente.\nRepetiremos con ganas para seguir explorando la carta!",
    //           languageCode: "es",
    //         },
    //         originalText: {
    //           text: "Sin duda el mejor sushi que hemos probado hasta el momento!\nSi tuviera que elegir una recomendación sería el tartar de atún con huevo y trufa y el nigiri de vieira, pero cualquiera de los platos es exquisito.\nAdemás tanto el trato como ambiente nos ha resultado excelente.\nRepetiremos con ganas para seguir explorando la carta!",
    //           languageCode: "es",
    //         },
    //         authorAttribution: {
    //           displayName: "Patricia E",
    //           uri: "https://www.google.com/maps/contrib/106546657813204735059/reviews",
    //           photoUri:
    //             "https://lh3.googleusercontent.com/a-/ALV-UjXz84_wY2ZoB6Z87GweghjEC1NHoip5S1YHGd3-K5EWtGi6YZJj=s128-c0x00000000-cc-rp-mo-ba3",
    //         },
    //         publishTime: "2024-03-13T22:05:56Z",
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/reviews/ChZDSUhNMG9nS0VJQ0FnSUREN0luMUNnEAE",
    //         relativePublishTimeDescription: "Hace 1 mes",
    //         rating: 5,
    //         text: {
    //           text: "Fuimos dos personas a cenarvcon nuestro perros , nos dejaron cenar dentro sin problema con la unica condición de que los perros se comportasen claro está.\nEmpezamos pidiendon el tartar de salmon y mango que estaba buenisimo, literalmente se desacia en la boca.\nSeguimos con diferentes medias raciones de sushi de las cuales las que mas me gustaron fueron todas muy , pero que muy buenas .\nPara terminar cerramos con el yakisoba de frutos de mar el cual estaba realmente bueno y era bastante abundante.\nNos quedamos muy llenos y la atención fue simplemente genial , hasta le regalaron una pieza de sushi a nuestros perritos.\nVolveremos.",
    //           languageCode: "es",
    //         },
    //         originalText: {
    //           text: "Fuimos dos personas a cenarvcon nuestro perros , nos dejaron cenar dentro sin problema con la unica condición de que los perros se comportasen claro está.\nEmpezamos pidiendon el tartar de salmon y mango que estaba buenisimo, literalmente se desacia en la boca.\nSeguimos con diferentes medias raciones de sushi de las cuales las que mas me gustaron fueron todas muy , pero que muy buenas .\nPara terminar cerramos con el yakisoba de frutos de mar el cual estaba realmente bueno y era bastante abundante.\nNos quedamos muy llenos y la atención fue simplemente genial , hasta le regalaron una pieza de sushi a nuestros perritos.\nVolveremos.",
    //           languageCode: "es",
    //         },
    //         authorAttribution: {
    //           displayName: "Victor Gracia",
    //           uri: "https://www.google.com/maps/contrib/101852788886969101404/reviews",
    //           photoUri:
    //             "https://lh3.googleusercontent.com/a/ACg8ocJrbbQBpyAy5QD0f6Mnf7Wdj-qyeV1OpNPwR64zdyk3kG3d9g=s128-c0x00000000-cc-rp-mo-ba4",
    //         },
    //         publishTime: "2024-04-06T16:52:09Z",
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/reviews/ChZDSUhNMG9nS0VJQ0FnSUREdGV5YlBBEAE",
    //         relativePublishTimeDescription: "Hace 1 mes",
    //         rating: 4,
    //         text: {
    //           text: "El local no es muy grande pero tiene una decoración bonita con mesas de madera talladas en ramas de árbol.\nTienen una carta bastante variada de sushi, entrantes japoneses, poke y platos calientes.\nFuimos a cenar 5 personas y pedimos todo platos para compartir. De entrante nos trajeron mix de verduras en tempura, gyozas de pollo y gambones en tempura.\nDe principal compartimos un barco con 40 piezas variadas de sushi (combo c) que las elige el chef y también un Pat y un Beethoven.\nLos platos en general muy ricos aunque las raciones no son muy abundantes y los precios son bastante altos.\nDe postre comimos coulant de chocolate, gofre con helado y gyozas de manzana con Nutella que fue bastante exótico.",
    //           languageCode: "es",
    //         },
    //         originalText: {
    //           text: "El local no es muy grande pero tiene una decoración bonita con mesas de madera talladas en ramas de árbol.\nTienen una carta bastante variada de sushi, entrantes japoneses, poke y platos calientes.\nFuimos a cenar 5 personas y pedimos todo platos para compartir. De entrante nos trajeron mix de verduras en tempura, gyozas de pollo y gambones en tempura.\nDe principal compartimos un barco con 40 piezas variadas de sushi (combo c) que las elige el chef y también un Pat y un Beethoven.\nLos platos en general muy ricos aunque las raciones no son muy abundantes y los precios son bastante altos.\nDe postre comimos coulant de chocolate, gofre con helado y gyozas de manzana con Nutella que fue bastante exótico.",
    //           languageCode: "es",
    //         },
    //         authorAttribution: {
    //           displayName: "Patrick A.",
    //           uri: "https://www.google.com/maps/contrib/113578542918727703914/reviews",
    //           photoUri:
    //             "https://lh3.googleusercontent.com/a-/ALV-UjU2Yfr3k8ILAb2opAlKaDw5yRvM7lymd4iQBrjwg2URw9AwL_gm=s128-c0x00000000-cc-rp-mo-ba6",
    //         },
    //         publishTime: "2024-04-12T13:44:24Z",
    //       },
    //     ],
    //     photos: [
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZmieup7s7EmeIuPe5WoeHym7CaJmMR5d2rjQhPuTZPRAkp9QS2Gep_5SaYjdASczjilowrbtl185D9yHfXs_pl22HVbYXedP7mX48tYRsU7ppZHXCylMNgi2v0ZaGRVTofvFJWhChOppXS11WzPHVvvhMWih-INgOkT",
    //         widthPx: 4000,
    //         heightPx: 3000,
    //         authorAttributions: [
    //           {
    //             displayName: "Ruskie Beat",
    //             uri: "//maps.google.com/maps/contrib/110713230319996091411",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a-/ALV-UjVtX2c7ZvdfimT5v56dkXNzCeGZm4X-tvgL5FMXFZ6fFFls-rJc=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZkaFbBzkYQ1X8jgkJqlfejt81eZzwyPpQX6DBEjWFy9oS2DMVmq_xZHrGUKX-C4SE-IjxFFZeglTzR658faBF8KC4j0RUq5-q3JjMvvrmdynM7FVBjTG25nQ4wryDC3ry_Ql4IG4dPY7_fnyGc2R6mPzO-QTe0eeiw8",
    //         widthPx: 4030,
    //         heightPx: 2670,
    //         authorAttributions: [
    //           {
    //             displayName: "Antxoka",
    //             uri: "//maps.google.com/maps/contrib/118438975932157151669",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a-/ALV-UjUXgV0sV26UyvazyQqy5iCM2I5KftbLMHolB0V_0UBJqlUacqPXVA=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZnRR9sNlH72-U4CQiHlLFtI3rkHnzGT1AldRTm8-z1EFDcnfyUaIPtpK-c4TGAKz_j2_HsPZ4PNwCzM9NimCqQO6ePJj4oWp0lkQTc__zqMGjVJySekSBKjDuqFOK93bQFWSsZ2nVXSpzX44tE7j8Zwbp9sBESyjoPt",
    //         widthPx: 4032,
    //         heightPx: 3024,
    //         authorAttributions: [
    //           {
    //             displayName: "Jeftefany Vargas",
    //             uri: "//maps.google.com/maps/contrib/114149645713297385847",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a/ACg8ocIMq1lJU0tqE7mB1yX71PZfus7wbeKfWDg2hBS8mg1nqVpfHA=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZkMJXQbOuul6RE2bPwHGi8LQfVZciLtKpA8sD_kprVkUtrOSuv56bNlQpeN-15TP7AbpCm83lh-xq2f_fzOMYWL5NR8gSAQu9MBg4zK_Q1c0ACl-E2RTipAieLFahjC249j1MfQMuO0D0VnqlVSkJPDiVa3fJ_PbFcy",
    //         widthPx: 4000,
    //         heightPx: 3000,
    //         authorAttributions: [
    //           {
    //             displayName: "Iker Burguera",
    //             uri: "//maps.google.com/maps/contrib/100176150396284467396",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a-/ALV-UjWGy8caAMZJcjTmY-pQfmNY3wGJw-AoylX4XjcbG6Yj8P-_mRBssg=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZmJJDn78HFaaExd1FcX-c_GojqamzbKpKBNFOQ_MvwTXGRxmC89krOA1uEcesNKRk6IFM2G-S8h0xl84GeYUX3rv8WTKyUCCUtieTND4G0QJ8He62dR_FE4mcufgq2Fh8RoUsHSgK98hf4vSdfEvPJSarRggVt8PNbJ",
    //         widthPx: 4000,
    //         heightPx: 3000,
    //         authorAttributions: [
    //           {
    //             displayName: "F",
    //             uri: "//maps.google.com/maps/contrib/107181072531750744685",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a/ACg8ocIun12x5qQLbhH7AA_sdsQ_j5XSp6wakLG2burMrLoicgHktA=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZnXMPeqWNo3CQLyuS8353LsXP42egSn83xbxeFWy1Bnnn2HLRK45uAHcUAZ1sfn3FvAXYXX14Uf3oMAfNGjRg-NkrDW2lBNiBO0hGeMrUJ_22_h_Q-R3d9KDfIRM9tnCR_5yesh4mnQCAQv-C7IdFlK6703K0IL1woe",
    //         widthPx: 4032,
    //         heightPx: 3024,
    //         authorAttributions: [
    //           {
    //             displayName: "Julen Millan",
    //             uri: "//maps.google.com/maps/contrib/117911993982843857065",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a/ACg8ocLnbnvMGR3fWAZU8gBFIw9L5VA_7SElSyBwZwikTX6lXIInUQ=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZmqF3cwNplxy0ZEctvQzxU6MCLE83GB7w9GyFMQxI38yBIAMZhE9-pFuI399J9OZ6IN1xlSmxoxkOoaaPH1Zdva5S5_slrOZZi4k6jeBkgkpCk8Ye3Q-KAEdldURmmswKwBLKOVpLAdT3wS7Uponi8XxtOZr1Lf55go",
    //         widthPx: 4000,
    //         heightPx: 3000,
    //         authorAttributions: [
    //           {
    //             displayName: "Iker Burguera",
    //             uri: "//maps.google.com/maps/contrib/100176150396284467396",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a-/ALV-UjWGy8caAMZJcjTmY-pQfmNY3wGJw-AoylX4XjcbG6Yj8P-_mRBssg=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZkOUOyr4hVR4E4CvW8245hf1wvxzmju5F-K0z9KegPUyKM58BaTooj_k3D9g-Ub-QlX99eH1KjODpaRCxJjsm_EPczzhIDf-g5R9d7YV4Izzbh5hQxJyvB4CTs6u6EfYRTMto9qUuxf0-_ihYfp0WzuBtyPTAKxBbwk",
    //         widthPx: 4032,
    //         heightPx: 3024,
    //         authorAttributions: [
    //           {
    //             displayName: "Patrick A.",
    //             uri: "//maps.google.com/maps/contrib/113578542918727703914",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a-/ALV-UjU2Yfr3k8ILAb2opAlKaDw5yRvM7lymd4iQBrjwg2URw9AwL_gm=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZmFx8qYlshgGnk423SO4Gq2iWpk4qThHWLbz-iyrQMb_81pRpig4V0ROfQYcwU1zO73ttuah57pmZUlD_g4pl9je684tw10pYCPBKPY8-oSKTQP76EfrCXQfUCFVyqTDY6BR1TF0MxERT9MKtI6iPBQRcGfbJljTBQQ",
    //         widthPx: 4000,
    //         heightPx: 3000,
    //         authorAttributions: [
    //           {
    //             displayName: "Ander Lopez Delgado",
    //             uri: "//maps.google.com/maps/contrib/105814910458592540476",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a-/ALV-UjVvuXPybY_g-2sHHtPLx3F6TX1rIur_TtXB0fRI2WarGrmV3ygt3A=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //       {
    //         name: "places/ChIJ7R2jtOZbTg0RpGUzXA5jBnc/photos/AUGGfZmPtQ4iReSt26faSmMC4Q6zdgQatLKcD2Ig6YNi7DtkZUy9Fg2Pk2X9zqZD5yv1lDfpOp0cJCBvzzD6p1tFtNIBnPBO2IHi4z89ImifsQrpFkER8211KTN56q5-q8_3Xl8O67nL4G-tE4frqhKGWLMmrp4jn9fle4kT",
    //         widthPx: 3330,
    //         heightPx: 3024,
    //         authorAttributions: [
    //           {
    //             displayName: "Antxoka",
    //             uri: "//maps.google.com/maps/contrib/118438975932157151669",
    //             photoUri:
    //               "//lh3.googleusercontent.com/a-/ALV-UjUXgV0sV26UyvazyQqy5iCM2I5KftbLMHolB0V_0UBJqlUacqPXVA=s100-p-k-no-mo",
    //           },
    //         ],
    //       },
    //     ],
    //     outdoorSeating: true,
    //     liveMusic: false,
    //     menuForChildren: false,
    //     servesCocktails: true,
    //     servesDessert: true,
    //     servesCoffee: true,
    //     goodForChildren: false,
    //     restroom: true,
    //     goodForGroups: true,
    //     goodForWatchingSports: false,
    //     paymentOptions: {
    //       acceptsCreditCards: true,
    //       acceptsDebitCards: true,
    //       acceptsCashOnly: false,
    //       acceptsNfc: true,
    //     },
    //     parkingOptions: {
    //       paidStreetParking: true,
    //     },
    //     accessibilityOptions: {
    //       wheelchairAccessibleParking: false,
    //       wheelchairAccessibleEntrance: true,
    //       wheelchairAccessibleRestroom: true,
    //       wheelchairAccessibleSeating: true,
    //     },
    //   },
    // };
    // setRestaurant(response.data);
    if (response.data.photos) {
      const photoUrls = response.data.photos.map((photo) => {
        const photoReference = photo.name;
        const maxwidth = 400; // Ancho máximo de la imagen
        return {
          original: `https://places.googleapis.com/v1/${photoReference}/media?key=${apiKey}&maxWidthPx=${maxwidth}`,
        };
      });

      setPhotos(photoUrls);
    }
  }
  function onBack() {
    navigate(-1);
  }

  function onGoCreate() {
    navigate("/create-plate", {
      state: { restaurant, step: 2, from: "restaurant" },
    });
  }

  function onGoRestaurant() {
    navigate("/restaurant", { state: { restaurantId: restaurant._id } });
  }

  return (
    <div className="restaurant-detail">
      <Header
        left={
          <MdOutlineArrowBackIosNew
            onClick={onBack}
            size={20}
            color="white"
            style={{ position: "relative", top: 4 }}
          />
        }
        // title={"Perfil"}
        style={{ height: 60, backgroundColor: "transparent", flex: "0 0 auto" }}
      />{" "}
      <div className="restaurant-detail__carrusel">
        {<Carrusel images={photos} />}
        {/* {photos.map((item) => (
        <img src={item} />
      ))} */}
      </div>
      <div className="restaurant-detail__info">
        <span className="restaurant-detail__title">
          <span className="restaurant-detail__title-text">
            {restaurant?.name}
          </span>
          <span className="restaurant-detail__address">
            {restaurant?.formatted_address}
          </span>
        </span>

        {!isVisited(restaurant.placeId) && (
          <div className="restaurant-detail__meta">
            <div className="restaurant-detail__meta-1">
              <div className="restaurant-detail__visit">
                <MdOutlineWrongLocation size={30} color={"black"} />
                <span>No visitado</span>
              </div>
              {isInWhislist(restaurant.placeId) === false && (
                <div
                  className="restaurant-detail__whislist"
                  onClick={async () => {
                    const aa = await addWhislist(restaurant);
                    if (aa?.length > 0) {
                      setAwards(aa);
                    }
                  }}
                >
                  <TbMapPinHeart size={30} color="gray" />
                  <span>¡Añadir a whislist! </span>
                </div>
              )}
              {isInWhislist(restaurant.placeId) === true && (
                <div
                  className="restaurant-detail__whislist"
                  onClick={() => deleteWhislist(restaurant)}
                >
                  <TbMapPinHeart size={30} color="red" />
                  <span>En la wishlist</span>
                </div>
              )}
            </div>
            <Button
              onPress={onGoCreate}
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
        )}
        {isVisited(restaurant.placeId) && (
          <div className="restaurant-detail__visited">
            <div className="restaurant-detail__visited-icon">
              <MdOutlineLocationOn size={30} color="green" />
              <span> visitado</span>
            </div>
            <Button
              onPress={onGoRestaurant}
              text={
                <div class="home__button-add">
                  <PiBowlFoodDuotone
                    size={24}
                    color="white"
                    style={{ marginLeft: 8 }}
                  />
                  <span class="home__button-add-text">Ver platos</span>
                </div>
              }
            />
          </div>
        )}
        {!!awards.length > 0 && (
          <AwardModal
            awards={awards}
            isVisible={!!awards.length > 0}
            onClose={() => setAwards([])}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;

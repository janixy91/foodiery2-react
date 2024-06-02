import React from "react";
import ReactDOM from "react-dom";
import ImageGallery from "react-image-gallery";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Carrusel = ({ images = [] }) => {
  console.log(images, "sss");
  return (
    <div>
      <ImageGallery
        items={images}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
        showNav={false}
      />
    </div>
  );
};

export default Carrusel;

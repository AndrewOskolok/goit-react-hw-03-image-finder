import React from "react";
// import PropTypes from "prop-types";
import "./ImageGallery.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, nextPage, openModal }) => {
  return (
    <>
      <ul className="ImageGallery">
        {images.map((image) => (
          <ImageGalleryItem
            key={image.id}
            smallImg={image.smallImg}
            largeImg={image.largeImg}
            openModal={openModal}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {};

export default ImageGallery;

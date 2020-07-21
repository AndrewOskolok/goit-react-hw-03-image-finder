import React from "react";
// import PropTypes from "prop-types";
import "./ImageGalleryItem.css";

const ImageGalleryItem = ({ smallImg, largeImg, openModal }) => {
  return (
    <button
      className="ImageGalleryItem-button"
      onClick={() => openModal(largeImg)}
    >
      <li className="ImageGalleryItem">
        <img src={smallImg} alt="" className="ImageGalleryItem-image" />
      </li>
    </button>
  );
};

ImageGalleryItem.propTypes = {};

export default ImageGalleryItem;

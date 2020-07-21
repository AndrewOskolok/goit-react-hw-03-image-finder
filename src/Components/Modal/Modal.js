import React from "react";
// import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ openModalImg, closeModal }) => {
  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={openModalImg} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;

import React from "react";
// import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ nextPage }) => {
  return (
    <button className="Button" onClick={nextPage}>
      Load more
    </button>
  );
};

Button.propTypes = {};

export default Button;

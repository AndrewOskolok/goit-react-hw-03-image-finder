import React, { useState } from "react";
// import PropTypes from "prop-types";
import "./Searchbar.css";

const Searchbar = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const inputName = ({ target }) => {
    setText(target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (text !== "") {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={submitForm}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          placeholder="Search images and photos"
          value={text}
          onChange={inputName}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {};

export default Searchbar;

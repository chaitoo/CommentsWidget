import React from "react";
import style from "./Button.module.css";

const Button = ({ text, customClass, onClick }) => {
  return (
    <button
      className={
        customClass !== "DEFAULT" ? style["btn-action"] : style["btn-default"]
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

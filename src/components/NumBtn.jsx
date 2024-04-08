import React from "react";
import './styles.css';
import { useStore } from './Store'

export const NumBtn = ({ text, color, largeWidth, type, onClick }) => {

  const updateCurrent = useStore((state) => state.updateCurrent)

  const buttonColor = {
    backgroundColor: color ? `var(--${color})` : 'var(--btn-dark)',
  }

  return (
    <div onClick={
      type === 'num' ? () => updateCurrent(text) : onClick
    } style={buttonColor}
      className={largeWidth ? "num-btn btn-width" : "num-btn"}
    >
      <div className="num-wpr">
        <div className="text-wrapper">{text}</div>
      </div>
    </div >
  );
};

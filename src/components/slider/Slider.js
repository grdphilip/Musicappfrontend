
import { useState, useRef, useEffect } from 'react'
import "./slider.css";
import "./thumb.css";

function Slider() {
 

  return (
  <div className="slider-container">
    <div className='progress-bar-cover'></div>
    <div className ='thumb'></div>
    <input type='range' className="range"></input>


  </div>
  );
}

export default Slider;

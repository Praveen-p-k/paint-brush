import React from "react";
import "../App.css";

const Menu = ({
  setLineColor,
  setLineWidth,
  setLineOpacity,
  handleUndo,
  handleRedo,
  toggleEraser,
  isEraserActive,
}: any) => {
  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
        disabled={isEraserActive}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="1"
        max="100"
        onChange={(e: any) => {
          setLineOpacity(e.target.value / 100);
        }}
        disabled={isEraserActive}
      />
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <button onClick={toggleEraser}>
        {isEraserActive ? "Disable Eraser" : "Enable Eraser"}
      </button>
    </div>
  );
};

export default Menu;

import React from "react";
// style
import style from "./ScoreBoard.module.css";

function ScoreBoard({ score, maxScore }) {
  return (
    <div className={style.scoreBoard}>
      <h1>Score: {score}</h1>
      <h1>Max score: {maxScore}</h1>
    </div>
  );
}

export default ScoreBoard;

import React, { useState, useEffect } from "react";
// style
import style from "./GameBoard.module.css";

function GameBoard({ characters, onCardClick }) {
  return (
    <div className={style.gameBoard}>
      {characters.length === 0 && (
        <h1 className={style.emptyGame}>
          Play and view here the sequence of cards chosen in the last game
        </h1>
      )}
      {characters.map(({ id, name, image }) => (
        <div key={id} className={style.card} onClick={onCardClick(id)}>
          <img src={image} alt={`${name} image`} />
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  );
}

export default GameBoard;

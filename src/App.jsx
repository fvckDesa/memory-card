import React, { useState, useEffect } from "react";
import { shuffle } from "@src/utils";
// style
import style from "./App.module.css";
// assets
import RickAndMortyLogo from "@src/assets/rick-and-morty-logo.png";
// components
import GameBoard from "@components/GameBoard";
import ScoreBoard from "@components/ScoreBoard";

function App() {
  // game states
  const [characters, setCharacters] = useState([]);
  const [stackCardClicked, setStackCardClicked] = useState([]);
  const [lastGame, setLastGame] = useState({ score: 0, characters: [] });
  const [visualizeLastGame, setVisualizeLastGame] = useState(false);
  // score states
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setCharacters(
          shuffle(
            data.results.map(({ id, name, image }) => ({ id, name, image })),
          ),
        );
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  function handleClick(id) {
    return () => {
      if (visualizeLastGame) return;
      // lose
      if (stackCardClicked.includes(id)) {
        // change max score
        setMaxScore(Math.max(maxScore, score));
        // set last game
        setLastGame({
          score,
          characters: stackCardClicked.map((id) =>
            characters.find((character) => character.id === id),
          ),
        });
        // reset game
        setScore(0);
        setStackCardClicked([]);
      } else {
        setScore(score + 1);
        setStackCardClicked([...stackCardClicked, id]);
      }
      // shuffle cards
      setCharacters(shuffle(characters));
    };
  }

  return (
    <div className={style.App}>
      <header className={style.header}>
        <img className={style.logo} src={RickAndMortyLogo} />
        <button onClick={() => setVisualizeLastGame((prev) => !prev)}>
          {visualizeLastGame ? "Play" : "Last game"}
        </button>
      </header>
      <ScoreBoard score={score} maxScore={maxScore} />
      <GameBoard
        characters={visualizeLastGame ? lastGame.characters : characters}
        onCardClick={handleClick}
      />
    </div>
  );
}

export default App;

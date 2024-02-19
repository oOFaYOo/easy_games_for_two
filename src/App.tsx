import React from 'react';
import TicTacToe from "./TicTacToe";
import RockPaperScissors from "./RockPaperScissors";

function App() {
  return (
    <div className={'flex flex-row items-center gap-8'}>
      <TicTacToe />
      <RockPaperScissors />
    </div>
  );
}

export default App;

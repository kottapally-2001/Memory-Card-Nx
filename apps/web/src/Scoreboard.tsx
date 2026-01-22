import "./App.css";

type Props = {
  score: number;
  best: number;
  onReset: () => void;
};

export default function Scoreboard({ score, best, onReset }: Props) {
  return (
    <header className="scoreboard">
      <div>
        <h1>Memory Card</h1>
        <h3>Memory is the treasure house of the mind.</h3>
        <h4>Every small step you take sharpens your mind, just like every card you flip sharpens your memory</h4>
      </div>
      <div className="scores">
        <div className="score">Score: <strong>{score}</strong></div>
        <div className="best">Best: <strong>{best}</strong></div>
        <button className="reset-btn" onClick={onReset}>Reset</button>
      </div>
    </header>
  );
}

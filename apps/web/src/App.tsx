import { useEffect, useState, type JSX } from "react";
import useCards, { type CardType } from "./usecard";
import { shuffleArray } from "./shuffle";
import Scoreboard from "./Scoreboard";
import CardGrid from "./CardGrid";
import "./App.css";

const CARD_COUNT = 6;

export default function App(): JSX.Element {
  const { cards, setCards, loading, error } = useCards(CARD_COUNT);
  const [shuffled, setShuffled] = useState<CardType[]>([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    const b = localStorage.getItem("memory_best");
    return b ? Number(b) : 0;
  });

  useEffect(() => {
    if (cards.length) {
      setShuffled(shuffleArray(cards));
      setCards(prev => prev.map(c => ({ ...c, clicked: false })));
      setScore(0);
    }
  }, [cards.length, setCards]);

  useEffect(() => {
    localStorage.setItem("memory_best", String(best));
  }, [best]);

  const resetClicked = (arr: CardType[]) => arr.map(c => ({ ...c, clicked: false }));

  const handleCardClick = (id: number) => {
    setCards(prev => {
      const target = prev.find(p => p.id === id);
      if (!target) return prev;

      if (target.clicked) {
        setBest(b => Math.max(b, score));
        setScore(0);
        const reset = resetClicked(prev);
        setShuffled(shuffleArray(reset));
        return reset;
      }

      const updated = prev.map(p => (p.id === id ? { ...p, clicked: true } : p));

      const newScore = score + 1;
      setScore(newScore);
      if (newScore > best) setBest(newScore);

      setShuffled(shuffleArray(updated));

      if (updated.every(c => c.clicked)) {
        setTimeout(() => {
          setBest(b => Math.max(b, newScore));
          setScore(0);
          const reset = resetClicked(updated);
          setCards(reset);
          setShuffled(shuffleArray(reset));
        }, 700);
      }

      return updated;
    });
  };

  const handleReset = () => {
    setScore(0);
    setBest(0);
    setCards(prev => resetClicked(prev));
    setShuffled(prev => shuffleArray(resetClicked(prev)));
    localStorage.removeItem("memory_best");
  };

  return (
    <div className="app">
      <Scoreboard score={score} best={best} onReset={handleReset} />
      {loading && <p className="status">Loading cards…</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && (
        <>
          <CardGrid cards={shuffled} onCardClick={handleCardClick} />
          <footer className="footer">
            Click each card only once. If you click a card twice, your score resets. Cards shuffle after every click.
            <p>Try to click all cards without repeating.
            Remember which cards you clicked!</p>
          </footer>
        </>
      )}
    </div>
  );
}

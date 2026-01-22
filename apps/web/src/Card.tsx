import "./App.css";
import type { CardType } from "./usecard";

type Props = {
  card: CardType;
  onClick: (id: number) => void;
};

export default function Card({ card, onClick }: Props) {
  return (
    <button
      className="card"
      onClick={() => onClick(card.id)}
      aria-pressed={card.clicked}
      title={card.name}
    >
      <img src={card.image} alt={card.name} draggable={false} />
      <div className="card-name">{card.name}</div>
    </button>
  );
}

import "./App.css";
import Card from "./Card";
import type { CardType } from "./usecard";

type Props = {
  cards: CardType[];
  onCardClick: (id: number) => void;
};

export default function CardGrid({ cards, onCardClick }: Props) {
  return (
    <main className="grid">
      {cards.map(c => (
        <Card key={c.id} card={c} onClick={onCardClick} />
      ))}
    </main>
  );
}

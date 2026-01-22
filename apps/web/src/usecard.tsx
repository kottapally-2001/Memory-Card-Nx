import { useState, useEffect } from "react";

export type CardType = {
  id: number;
  name: string;
  image: string;
  clicked: boolean;
};

export default function useCards(count: number) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const results: CardType[] = [];

        for (let i = 0; i < count; i++) {
          const res = await fetch("https://dog.ceo/api/breeds/image/random");
          const data = await res.json();

          results.push({
            id: i,
            name: "Dog",
            image: data.message, 
            clicked: false,
          });
        }

        setCards(results);
        setError(null);
      } catch {
        setError("Failed to load dogs");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [count]);

  return { cards, setCards, loading, error };
}

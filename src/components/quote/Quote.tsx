import { useState, useEffect } from "react";
import { quotes } from "../../constants/quotes";

export default function Quote() {
  const [randomQuote, setRandomQuote] = useState<{
    author: string | null;
    text: string;
  } | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  if (!randomQuote) {
    return <div>Loading quote...</div>;
  }

  return (
    <figure>
      <blockquote>"{randomQuote.text}"</blockquote>
      {randomQuote.author && <figcaption>- {randomQuote.author}</figcaption>}
    </figure>
  );
}

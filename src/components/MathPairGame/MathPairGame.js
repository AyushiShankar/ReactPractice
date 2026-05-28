import  { useState, useEffect } from 'react';
import styles from './MatchPairGame.module.css';

const initialEmojis = ['❤️', '🍀', '🌎', '🍎', '⚽️', '🚗', '⛵️', '💎'];

const shuffledArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;

};


const getShuffledArray = () => {
  const duplicated = [...initialEmojis, ...initialEmojis];
  const shuffled = shuffledArray(duplicated);
  return shuffled.map((emoji, index) => ({
    id: index,
    value: emoji,
    revealed: false,
    matched: false,
  }))

};

const MatchPairGame = () => {
  const [cards, setCards] = useState(getShuffledArray); // Each card: { id, value, revealed, matched }
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [diableAll, setDisableAll] = useState(false);

  const handleClick = (card) => {
    if (diableAll || card.revealed || card.matched) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, revealed: true } : c
    );

    setCards(updatedCards);

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
      setMoves((prev) => prev + 1);
      setDisableAll(true);

    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      const timeout = setTimeout(() => {
        if (firstCard.value === secondCard.value) {
          setCards((prev) =>
            prev.map((c) =>
              c.value === firstCard.value ? { ...c, matched: true } : c
            ));
        }

        else {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, revealed: false }
                : c
            )
          );
        }
        setFirstCard(null);
        setSecondCard(null);
        setDisableAll(false);
      }, 800);
      return () => clearTimeout(timeout);
    }

  }, [firstCard, secondCard]);


  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setWon(true);
    }
  }, [cards]);

  const resetGame = () => {
    setMoves(0);
    setWon(false);
    setFirstCard(null);
    setSecondCard(null);
    setDisableAll(false);
    setCards(getShuffledArray());
  };

  return (
   <div className={styles['game-container']}>
      <h1>Match Pair Game</h1>
      <div className={styles.grid}>
        {cards.map((card) => (
          <div
            key={card.id}
             className={`${styles.card} ${
          card.revealed || card.matched ? styles.revealed : ''
        }`}
            onClick={() => handleClick(card)}
          >
            {(card.revealed || card.matched) && card.value}
          </div>
        ))}
      </div>
      <p>Moves: {moves}</p>
      {won && <p className={styles.won}>🎉 You won!</p>}
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default MatchPairGame;

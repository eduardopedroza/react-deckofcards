import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardGame () {
  const [deck, setDeck] = useState(null);
  const [drawnCard, setDrawnCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get('https://deckofcardsapi.com/api/deck/new/');
        setDeck(res.data.deck_id);
      } catch (e) {
        setError('Error: Unable to get new deck');
      }
    }
    getDeck();
  }, []);

  async function drawCard() {
    try {
      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
      const card = res.data.cards[0];
      if (!card) {
        setError('Error: No cards remaining');
      } else {
        setDrawnCard(card);
        setError(null);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async function shuffleDeck() {
    try {
      await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/shuffle/`);
      setDrawnCard(null);
      setError(null);
    } catch (e) {
      setError('Error: Unable to shuffle deck')
    }
  }

  return (
    <div className="GameContainer">
      <button onClick={() => drawCard()}>Draw a Card</button>
      {drawnCard && (
        <div> 
          <img 
            src={drawnCard.image} alt={drawnCard.code}/>
        </div>
      )}
      <button onClick={() => shuffleDeck()}>Shuffle Deck</button>
      {error && <p>{error}</p>}
    </div>
  )
}



export default CardGame;
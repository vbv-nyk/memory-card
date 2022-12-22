import { useEffect, useState } from 'react';
import './App.css';
import { cardData } from './CardsData';
function CardsContainer({ children }) {
  return (
    <div className='card-container'>
      {children}
    </div>
  );
}
function Card({ data }) {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const cardContainer = document.querySelector(".card-container");
    for (let i = cardContainer.children.length; i >= 0; i--) {
      cardContainer.appendChild(cardContainer.children[Math.random() * i | 0]);
    }
  }, [clicked]);
  function updateScore() {
    if (clicked) {
      data.setHighScore(Math.max(data.score, data.highScore));
      data.setScore(0);
      setClicked(false);
    } else {
      data.setScore(n => n + 1);
      setClicked(true);
    }
  }
  return (<div onClick={updateScore} className="card">
    <div className="image-name">{data.name}</div>
    <img src={data.source} alt="" />
  </div>)
}
function ScoreBoard({ data }) {
  return (<>
    <div className='score-text'>{`Your current score is: ${data.score}`}</div>
    <div className='high-score-text'>{`Your Highscore is: ${data.highScore}`}</div>
  </>)
}

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const props = { score, highScore, setScore, setHighScore };
  function loadCards() {
    const Cards = cardData.map(card => {
      return <Card data={{ ...card, ...props }} key={card.key} />
    })
    return Cards;
  }
  return (
    <div>
      <ScoreBoard data={{ ...props }} />
      <CardsContainer>
        {loadCards()}
      </CardsContainer>
    </div>
  );
}

export default App;

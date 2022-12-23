import './App.css';
import { cardData } from './CardsData';
import { useEffect, useState } from 'react';

let currentCards = [];
function CardsContainer({ children }) {
  return (
    <div className='card-container'>
      {children}
    </div>
  );
}
function Card({ data }) {
  useEffect(() => {
    currentCards.push(this);
  }, []);

  useEffect(() => {
    const cardContainer = document.querySelector(".card-container");
    for (let i = cardContainer.children.length; i >= 0; i--) {
      cardContainer.appendChild(cardContainer.children[Math.random() * i | 0]);
    }
    currentCards.push(this);
  }, [data.clicked]);

  function updateScore() {
    if (data.clicked[data.key] === true) {
      resetCards(data);
    } else {
      data.setScore(data.score + 1);
      const updatedArray = data.clicked.map((c, i) => {
        if (i === data.key) {
          return true;
        } else {
          return c;
        }
      });
      data.setClicked(updatedArray);
    }
  }

  return (
    <div onClick={updateScore} className="card">
      <img src={data.source} alt="" />
      <div className="image-name">{data.name}</div>
    </div>
  );
}

function resetCards(data) {
  let tempArray = data.clicked.map((c, i) => {
    return false;
  })
  data.setClicked(tempArray);
  data.setScore(0);
  data.setHighScore(Math.max(data.score, data.highScore));
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
  const [clicked, setClicked] = useState([]);
  let props = { score, highScore, setScore, setHighScore, clicked, setClicked };
  useEffect(() => {
    const tempClickedArray = [];
    for (let i = 0; i < 10; i++) {
      tempClickedArray.push(false);
    }
    setClicked(n => tempClickedArray);
  }, [])
  function loadCard() {
    let Cards = cardData.map(card => {
      return (<Card data={{ ...card, ...props }} key={card.key} />)
    });
    return Cards;
  }
  return (
    <div className='app'>
      <ScoreBoard data={{ ...props }} />
      <CardsContainer>{loadCard()}</CardsContainer>
    </div>
  );
}

export default App;

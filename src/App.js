import './App.css';
import { cardData, fetchAnime } from './CardsData';
import { useEffect, useState } from 'react';
import { newGame } from '.';

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
      const checkBoard = updatedArray.every(element => {
        return element === true;
      });
      if (checkBoard) {
        data.setLoad(false);
        data.setLevel(n => n + 1);
        newGame(data.size + 3);
      }
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
  if (data.level !== 1) {
    data.setLoad(false);
    data.setLevel(1);
    newGame(5);
  }
}
function ScoreBoard({ data }) {
  return (<div className="game-info">
    <div className='score-text'>{`Your current score is: ${data.score}`}</div>
    <div className='high-score-text'>{`Your Highscore is: ${data.highScore}`}</div>
    <div className='level-text'>{`Current Level is: ${data.level}`}</div>
  </div>)
}

function App({ size }) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [load, setLoad] = useState(false);
  const [level, setLevel] = useState(1);
  let props = { score, highScore, setScore, setHighScore, clicked, setClicked, load, setLoad, size, level, setLevel };
  useEffect(() => {
    const tempClickedArray = [];
    for (let i = 0; i < size; i++) {
      tempClickedArray.push(false);
    }
    setClicked(n => tempClickedArray);
  }, [size])
  useEffect(() => {
    console.log(`Fetching ${size} Data`);
    fetchAnime(size).then(() => {
      setLoad(true);
    })
  }, [size])
  if (!load) {
    return <div className="card-container-loading">

    </div>
  }
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

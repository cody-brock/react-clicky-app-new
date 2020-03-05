import React, { useState } from "react";

// Imports components
import NavBar from "./NavBar/NavBar"
import Jumbotron from "./Jumbotron/Jumbotron";
import MonkeyCard from "./MonkeyCard/MonkeyCard";
import Wrapper from "./Wrapper/Wrapper"
import Swal from 'sweetalert2'


// Imports JSON file
import initialMonkeys from "../monkeys.json"

//Main Logic
const MonkeyContainer = () => {

  const [monkeys, setMonkeys] = useState(initialMonkeys)
  const [score, setScore] = useState(0)
  const [topScore, setTopScore] = useState(0)
  
  const monkeyArrLength = monkeys.length;

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const increaseScore = () => {
    let newScore = score + 1
    setScore(newScore)
    if (newScore > topScore) {
      setTopScore(newScore);
    }
  }

  const resetScore = () => {
    setScore(0);
  }

  const resetMonkeyAlreadyClicked = () => {
    for (let i = 0; i < monkeys.length; i++) {
      monkeys[i].alreadyClicked = false;
    }
    console.log(monkeys);
    setMonkeys(monkeys);
  }

  const randomizeMonkeyCards = () => {
    let newMonkeys = monkeys;
    let returnMonkeys = [];
    while (returnMonkeys.length < monkeyArrLength) {
      let monkeyIndex = randomIntFromInterval(0, newMonkeys.length-1);
      let monkeyPush = newMonkeys[monkeyIndex];
      returnMonkeys.push(monkeyPush);
      newMonkeys.splice(monkeyIndex, 1);
    }
    setMonkeys(returnMonkeys);
  }

  const winningCondition = (clickedMonkey) => {
    // Sets property so we know this monkey has been clicked
    clickedMonkey.alreadyClicked = true;
    // Updates NavBar
    increaseScore();
    // Triggers method to randomize then rerender cards
    randomizeMonkeyCards()
  }

  const losingCondition = () => {
    resetScore();
    resetMonkeyAlreadyClicked();
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'You already chose that card',
      // footer: '<a href>Why do I have this issue?</a>'
    })
  }

  // Method to handle when user clicks on Monkey images
  const handleMonkeyClick = clickedId => {
    // Finds the correct object in our monkey array
    const clickedMonkey = monkeys.filter(monkey => monkey.id===clickedId);
    // If monkey has already been clicked...
    if (clickedMonkey[0].alreadyClicked === true) {
      // Triggers losingCondition method
      losingCondition();
    } else {
      // Triggers winningCondition method
      winningCondition(clickedMonkey[0])
    }
  }

  return(
    <div>
      <NavBar 
        score={score}
        topScore={topScore}
        // handleScore={() => handleScore()}
      />
      <Jumbotron />
      
      <Wrapper>
        {monkeys.map(monkey => 
          <MonkeyCard 
            monkeyImage={monkey.image}
            monkeyName={monkey.name}
            key={monkey.id}
            clickMonkey={() => handleMonkeyClick(monkey.id)}
          />
        )}
      </Wrapper>
    </div>
  )
}

export default MonkeyContainer
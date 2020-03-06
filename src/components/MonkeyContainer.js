import React, { useState } from "react";

// Imports components
import NavBar from "./NavBar/NavBar"
import Jumbotron from "./Jumbotron/Jumbotron";
import MonkeyCard from "./MonkeyCard/MonkeyCard";
import Wrapper from "./Wrapper/Wrapper"
import Swal from 'sweetalert2'


// Imports JSON file
import initialMonkeys from "../monkeys.json"

// Main Logic
const MonkeyContainer = () => {

  // States
  const [monkeys, setMonkeys] = useState(initialMonkeys)
  const [score, setScore] = useState(0)
  const [topScore, setTopScore] = useState(0)
  
  // Stores the length of the monkeys JSON object
  const monkeyArrLength = monkeys.length;

  // Returns random number, for shuffling the monkey cards
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Handles logic for increasing score
  const increaseScore = () => {
    let newScore = score + 1
    setScore(newScore)
    // Sets new top score, if current score is greater than the top score
    if (newScore > topScore) {
      setTopScore(newScore);
    }
    // Listens for winning condition, which would be  
      // all cards clicked successfully, then restarts game
    if (newScore === monkeyArrLength) {
      Swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        text: 'You successfully chose all the monkeys correct. You are the real MVP.',
      })
      setScore(0);
      resetMonkeyAlreadyClicked();
    }
  }

  // Sets all the monkey objects to "unclicked," in order to restart game
  const resetMonkeyAlreadyClicked = () => {
    for (let i = 0; i < monkeys.length; i++) {
      monkeys[i].alreadyClicked = false;
    }
    setMonkeys(monkeys);
  }

  // Shuffles the monkey cards, then rerenders them
  // Note to self:  Could rewrite this - use state to keep an array with id's of monkeys clicked
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

  // Handles the winning condition
  const winningCondition = (clickedMonkey) => {
    // Sets property so we know this monkey has been clicked
    clickedMonkey.alreadyClicked = true;
    // Updates the score in the NavBar
    increaseScore();
    // Triggers method to randomize then rerender cards
    randomizeMonkeyCards()
  }

  // Handles the losing condition
  const losingCondition = () => {
    // Sets score to 0
    setScore(0)
    // Sets all the monkey objects to "unclicked," in order to restart game
    resetMonkeyAlreadyClicked();
    // Triggers an alert notifying user they have lost
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'You already chose that card',
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
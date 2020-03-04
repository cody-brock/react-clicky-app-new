import React, { useState } from "react";

// Imports components
import NavBar from "./NavBar/NavBar"
import Jumbotron from "./Jumbotron/Jumbotron";
import MonkeyCard from "./MonkeyCard/MonkeyCard";
import Wrapper from "./Wrapper/Wrapper"

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

  // Method to handle when user clicks on Monkey images
  const handleMonkeyClick = clickedId => {
    // Finds the correct object in our monkey array
    const clickedMonkey = monkeys.filter(monkey => monkey.id===clickedId);
    console.log("correctMonkey[0]", clickedMonkey[0]);

    // If monkey has already been clicked...
    if (clickedMonkey[0].alreadyClicked === true) {
      // Losing condition
      resetScore()
      alert("Already Clicked!");
    } else {
      // Winning condition
      console.log("hooray");
      // Sets property so we know this monkey has been clicked
      clickedMonkey[0].alreadyClicked = true;
      // Updates NavBar
      increaseScore();
      // Triggers method to randomize then rerender cards
      randomizeMonkeyCards()
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
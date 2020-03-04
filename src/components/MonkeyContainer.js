import React, { useState } from "react";

import NavBar from "./NavBar/NavBar"
import Jumbotron from "./Jumbotron/Jumbotron";
import MonkeyCard from "./MonkeyCard/MonkeyCard";
import Wrapper from "./Wrapper/Wrapper"

import initialMonkeys from "../monkeys.json"

const MonkeyContainer = () => {

  const [monkeys, setMonkeys] = useState(initialMonkeys)

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const monkeyArrLength = monkeys.length;

  const randomizeMonkeyCards = () => {
    //
    console.log('monkeys', monkeys)
    let newMonkeys = monkeys;
    console.log("newMonkeys", newMonkeys)
    let returnMonkeys = [];
    while (returnMonkeys.length < monkeyArrLength) {
      let monkeyIndex = randomIntFromInterval(0, newMonkeys.length-1);
      let monkeyPush = newMonkeys[monkeyIndex];
      returnMonkeys.push(monkeyPush);
      newMonkeys.splice(monkeyIndex, 1);
    }
    console.log("returnMonkeys", returnMonkeys);
    setMonkeys(returnMonkeys);
    console.log('after setMonkeys monkeys', monkeys)
  }

  // Method to handle when user clicks on Monkey images
  const handleMonkeyClick = clickedId => {
    // Finds the correct object in our monkey array
    const clickedMonkey = monkeys.filter(monkey => monkey.id===clickedId);
    console.log("correctMonkey[0]", clickedMonkey[0]);

    // If monkey has already been clicked...
    if (clickedMonkey[0].alreadyClicked === true) {
      // Losing condition
      alert("Already Clicked!");
    } else {
      // Winning condition
      console.log("hooray");
      // Sets property so we know this monkey has been clicked
      clickedMonkey[0].alreadyClicked = true;
      // Updates NavBar
      NavBar(1, 69)
      // Triggers method to randomize then rerender cards
      randomizeMonkeyCards()
    }
  }

  return(
    <div>
      <NavBar 
        score={2}
        topScore={5}
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
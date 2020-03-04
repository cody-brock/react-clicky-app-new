import React, { useState, useEffect } from "react";

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
    let newMonkeys = monkeys;
    // console.log('newMonkeys', newMonkeys)
    let returnMonkeys = [];
    while (returnMonkeys.length < monkeyArrLength) {
      let monkeyIndex = randomIntFromInterval(0, newMonkeys.length-1);
      let monkeyPush = newMonkeys[monkeyIndex];
      returnMonkeys.push(monkeyPush);
      newMonkeys.splice(monkeyIndex, 1);
      // console.log('returnMonkeys', returnMonkeys)
      // console.log('newMonkeys', newMonkeys)
      // console.log('monkeyIndex', monkeyIndex)
    }
    setMonkeys(returnMonkeys);
  }

  const handleMonkeyClick = id => {
    console.log("Monkey clicked: ", id);
    randomizeMonkeyCards()
  }

  return(
    <div>
      <NavBar 
        score={2}
        topScore={5}
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
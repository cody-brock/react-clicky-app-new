import React, { useState, useEffect } from "react";

import NavBar from "./NavBar/NavBar"
import Jumbotron from "./Jumbotron/Jumbotron";
import MonkeyCard from "./MonkeyCard/MonkeyCard";
import Wrapper from "./Wrapper/Wrapper"

import initialMonkeys from "../monkeys.json"

const MonkeyContainer = () => {

  // console.log(initialMonkeys);
  const [monkeys, setMonkeys] = useState(initialMonkeys)

  

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
          />
        )}
      </Wrapper>
    </div>
  )
}

export default MonkeyContainer
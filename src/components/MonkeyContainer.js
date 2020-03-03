import React, { useState, useEffect } from "react";
import NavBar from "./NavBar"

const MonkeyContainer = () => {




  return(
    <div>
      <NavBar 
        score={2}
        topScore={5}
      />
      <h1>Hello World</h1>

    </div>
  )
}

export default MonkeyContainer
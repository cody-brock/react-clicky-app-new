import React from 'react'
import "./navBar.css"

//need to style page

const NavBar = (props) => {
  return (
    <ul>
      <li>Monkey Game</li>
      <li>Click an image to begin!</li>
      <li>Score: {props.score} | Top Score: {props.topScore}</li>
    </ul>
  )
}

export default NavBar

import React from 'react'
import "./navBar.css"

const NavBar = (props) => {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li className="brand">Monkeying Around</li>
          <li>Click an image to begin!</li>
          <li className="score">Score: {props.score} | Top Score: {props.topScore}</li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar

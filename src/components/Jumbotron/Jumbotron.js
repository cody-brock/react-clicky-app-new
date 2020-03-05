import React from 'react'
import "./jumbotron.css"
import "./jungle_background_image.jpg"

//need to style

const Jumbotron = () => {
  return (
    <div className="header" >
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Monkeying Around</h1>
          <p className="lead">Click on an image to earn points, but be careful not to pick any image twice!</p>
        </div>
      </div>
    </div>
  )
}

export default Jumbotron

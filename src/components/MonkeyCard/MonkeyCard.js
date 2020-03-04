import React from 'react'
import "./monkeyCard.css"

const MonkeyCard = (props) => {

  return (
    <div className="flex-row">
      <div className="card monkey-card">
        <img src={props.monkeyImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">{props.monkeyName}</p>
        </div>
      </div>
    </div>
  )
}

export default MonkeyCard

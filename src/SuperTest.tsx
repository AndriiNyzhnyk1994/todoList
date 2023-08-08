import React, { useState } from "react"

export const Counter = () => {
    const [number, setNumber] = useState(0)
  const funcoTion = () => {

  }
    return (
      <>
        <h1>{number}</h1>
        <button
          onClick={() => {console.log(typeof(funcoTion))}}>+3</button>
      </>
    )
  }
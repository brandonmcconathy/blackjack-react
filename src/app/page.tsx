'use client'

import { useState } from "react"
import Bet from "./components/bet"

export default function Home() {

  const [stage, setStage] = useState('start')

  if (stage == 'start') {
    return(
      <main className="text-center mt-10">
        <h1 className="text-5xl mb-16">Blackjack</h1>
        <button onClick={function() {setStage('bet')}} className="bg-green-500 text-slate-800 px-3 py-1 rounded-xl text-xl font-semibold box-pop hover:bg-green-300 transition duration-300">Start Game</button>
      </main>
    )
  }

  if (stage == 'bet') {
    return(
      <main className="flex justify-center items-center text-center">
        <h1>Blackjack</h1>
        <Bet />
      </main>
    )
  }

  if (stage == 'play') {
    return(
      <>
        <h1>Dealer</h1>
        <div>
          <h2>Dealer Cards</h2>
        </div>
        <div>
          <h2>Player Cards</h2>
        </div>
        <h1>Player</h1>
      </>
    )
  }

  if (stage == 'again') {
    return(
      <>
        <h1>Play again?</h1>
        <div>
          <button>Yes</button>
          <button>No</button>
        </div>
      </>
    )
  }

  return (
    <main className="text-center">
      <h1>Blackjack</h1>
      <section>
        <h2>{stage}</h2>
      </section>
      <Bet />
    </main>
  )
}

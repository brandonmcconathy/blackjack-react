'use client'

import { useState } from "react"
import Bet from "./components/bet"

export default function Home() {

  const [stage, setStage] = useState('bet')

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
      <h1>Play game</h1>
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

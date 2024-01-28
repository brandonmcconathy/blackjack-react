'use client'

import { useContext } from "react"
import { StageContext } from "../../lib/stagecontext"
import Bet from "./components/bet"
import Play from "./components/play"
import PlayAgain from "./components/playagain"

export default function Home() {

  const context:any = useContext(StageContext)
  const {stage, setStage} = context
  console.log(stage)

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
      <main className="flex flex-col gap-5 justify-center items-center text-center mt-16">
        <Bet />
        <button onClick={function() {setStage('play')}} className="bg-green-500 text-slate-800 px-3 py-1 rounded-xl text-xl font-semibold box-pop hover:bg-green-300 transition duration-300">Place Bet</button>
      </main>
    )
  }

  if (stage == 'play') {
    return(
      <Play />
    )
  }

  if (stage == 'again') {
    return(
      <PlayAgain />
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

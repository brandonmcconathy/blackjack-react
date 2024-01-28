'use client'

import { useContext } from "react"
import { StageContext } from "../../lib/stagecontext"
import Start from "./components/start"
import Bet from "./components/bet"
import Play from "./components/play"
import PlayAgain from "./components/playagain"

export default function Home() {

  const context:any = useContext(StageContext)
  const {stage, setStage} = context
  console.log(stage)

  if (stage == 'start') {
    return(
      <Start />
    )
  }

  if (stage == 'bet') {
    return(
      <Bet />
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

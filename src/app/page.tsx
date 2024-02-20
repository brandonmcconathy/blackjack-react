'use client'

import { useContext } from "react"
import { StageContext } from "../../lib/context"
import Start from "./components/start"
import Bet from "./components/bet"
import Play from "./components/play"
import Win from "./components/win"
import Lose from "./components/lose"
import Push from "./components/push"
import Blackjack from "./components/blackjack"

export default function Home() {

  const context:any = useContext(StageContext)
  const { stage } = context

  switch(stage) {
    case 'start':
      return(<Start />)
    case 'bet':
      return(<Bet />)
    case 'play':
      return(<Play />)
    case 'win':
      return(<Win />)
    case 'lose':
      return(<Lose />)
    case 'push':
      return(<Push />)
    case 'blackjack':
      return(<Blackjack />)
  } 
}

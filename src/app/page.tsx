'use client'

import { useContext } from "react"
import { StageContext } from "../../lib/context"
import Start from "./components/start"
import Bet from "./components/bet"
import Play from "./components/play"
import PlayAgain from "./components/playagain"

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
    case 'again':
      return(<PlayAgain />)
  } 
}

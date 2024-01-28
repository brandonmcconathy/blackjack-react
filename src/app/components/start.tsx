import { useContext } from "react"
import { StageContext } from "../../../lib/stagecontext"

export default function Start() {

  const context:any = useContext(StageContext)
  const { setStage } = context

  return(
    <main className="text-center mt-10">
      <h1 className="text-5xl mb-16">Blackjack</h1>
      <button onClick={function() {setStage('bet')}} className="bg-green-500 text-slate-800 px-3 py-1 rounded-xl text-xl font-semibold box-pop hover:bg-green-300 transition duration-300">Start Game</button>
    </main>
  )
}
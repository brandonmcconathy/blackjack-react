import { useContext } from "react"
import { StageContext } from "../../../lib/context"

export default function Start() {

  const context:any = useContext(StageContext)
  const { setStage } = context

  return(
    <main className="text-center mt-10">
      <h1 className="text-5xl mb-16">Blackjack</h1>
      <button onClick={function() {setStage('bet')}} className="bg-green-500 text-slate-800 px-3 py-1 rounded-xl text-2xl font-semibold box-pop hover:bg-green-300 transition duration-300">Start Game</button>
      <div className="flex items-center justify-center mt-20">
        <img className="w-48 -mr-32" src="https://deckofcardsapi.com/static/img/KS.png" />
        <img className="w-48 -ml-10" src="https://deckofcardsapi.com/static/img/AS.png" />
      </div>
    </main>
  )
}
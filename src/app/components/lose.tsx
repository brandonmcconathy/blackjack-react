import { BalanceContext, BetContext, StageContext } from "../../../lib/context"
import { useContext } from "react"

export default function Lose() {

  const contextBalance:any = useContext(BalanceContext)
  const contextBet:any = useContext(BetContext)
  const contextStage:any = useContext(StageContext)
  const { setStage } = contextStage
  const { balance } = contextBalance
  const { setBet } = contextBet

  setBet(0)

  return(
    <section>
      <h1>You Lose</h1>
      <h3>Balance: {balance}</h3>
      <div>
        <button onClick={function() {setStage('bet')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Play Again</button>
        <button onClick={function() {setStage('start')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Leave</button>
      </div>
    </section>
  )
}
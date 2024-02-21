import { BalanceContext, BetContext, StageContext } from "../../../lib/context"
import { useContext, useEffect, useRef } from "react"

export default function Lose() {

  const contextBalance:any = useContext(BalanceContext)
  const contextBet:any = useContext(BetContext)
  const contextStage:any = useContext(StageContext)
  const { setStage } = contextStage
  const { balance } = contextBalance
  const { setBet } = contextBet

  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      setBet(0)
      isMounted.current = true
    }
  },[])

  return(
    <section className="flex flex-col items-center justify-center mt-5 gap-6">
      <h1 className="text-3xl">You Lose</h1>
      <h3 className="text-xl">Balance: {balance}</h3>
      <div className="flex gap-6">
        <button onClick={function() {setStage('bet')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Play Again</button>
        <button onClick={function() {setStage('start')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Leave</button>
      </div>
    </section>
  )
}
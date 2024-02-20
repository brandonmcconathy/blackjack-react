import { BalanceContext, BetContext, StageContext } from "../../../lib/context"
import { useContext, useEffect, useRef } from "react"

export default function Push() {

  const contextBalance:any = useContext(BalanceContext)
  const contextBet:any = useContext(BetContext)
  const contextStage:any = useContext(StageContext)
  const { setStage } = contextStage
  const { balance, setBalance } = contextBalance
  const { bet, setBet } = contextBet

  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      setBalance((prevBalance:number) => prevBalance + bet)
      setBet(0)
    }
  },[])

  return(
    <section>
      <h1>Push</h1>
      <h3>Balance: {balance}</h3>
      <div>
        <button onClick={function() {setStage('bet')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Play Again</button>
        <button onClick={function() {setStage('start')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Leave</button>
      </div>
    </section>
  )
}
import { BetContext, BalanceContext, StageContext } from "../../../lib/context"
import { useContext, useEffect, useState, useRef } from "react"

export default function Win() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const contextStage:any = useContext(StageContext)
  const { bet, setBet } = contextBet
  const { balance, setBalance } = contextBalance
  const { setStage } = contextStage
  
  const [ betAmount, setBetAmount ] = useState(0)
  const [ balanceAmount, setBalanceAmount ] = useState(0)

  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      setBetAmount(bet)
      setBalanceAmount(balance)
      setBalance((prevBalance:number) => prevBalance + 2 * bet)
      setBet(0)
      isMounted.current = true
    }
  },[])

  return(
    <section className="flex flex-col items-center justify-center mt-5 gap-6">
      <h1 className="text-3xl">YOU WIN</h1>
      <h2 className="text-xl">+ {betAmount}</h2>
      <h3 className="text-xl">Balance: {balance}</h3>
      <div className="flex gap-6">
        <button onClick={function() {setStage('bet')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Play Again</button>
        <button onClick={function() {setStage('start')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Leave</button>
      </div>
    </section>
  )
}
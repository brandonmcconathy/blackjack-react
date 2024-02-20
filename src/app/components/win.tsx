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
    <section>
      <h1>You Win!</h1>
      <h2>+ {betAmount}</h2>
      <h3>New Balance: {balance}</h3>
      <div>
        <button onClick={function() {setStage('bet')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Play Again</button>
        <button onClick={function() {setStage('start')}} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Leave</button>
      </div>
    </section>
  )
}
import { BetContext, BalanceContext } from "../../../lib/context"
import { useContext, useEffect, useState } from "react"

export default function Win() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const { bet, setBet } = contextBet
  const { balance, setBalance } = contextBalance
  
  const [ betAmount, setBetAmount ] = useState(0)
  const [ balanceAmount, setBalanceAmount ] = useState(0)

  useEffect(() => {
    setBetAmount(bet)
    setBalanceAmount(balance)
    setBet(0)
    setBalance((prevBalance:number) => prevBalance + bet)
  },[])

  return(
    <section>
      <h1>You Win!</h1>
      <h2>+ {betAmount}</h2>
      <h3>New Balance: {balance}</h3>
    </section>
  )
}
import { BetContext, BalanceContext } from "../../../lib/context"
import { useContext } from "react"

export default function Win() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const { bet, setBet } = contextBet
  const { balance, setBalance } = contextBalance

  return(
    <section>
      <h1>You Win!</h1>
      <h2>+ {bet}</h2>
      <h3>New Balance: {balance}</h3>
    </section>
  )
}
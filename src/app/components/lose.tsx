import { BalanceContext, BetContext } from "../../../lib/context"
import { useContext } from "react"

export default function Lose() {

  const contextBalance:any = useContext(BalanceContext)
  const contextBet:any = useContext(BetContext)
  const { balance } = contextBalance
  const { setBet } = contextBet

  setBet(0)

  return(
    <section>
      <h1>You Lose</h1>
      <h3>Balance: {balance}</h3>
    </section>
  )
}
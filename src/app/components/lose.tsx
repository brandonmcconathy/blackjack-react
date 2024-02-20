import { BalanceContext } from "../../../lib/context"
import { useContext } from "react"

export default function Lose() {

  const contextBalance:any = useContext(BalanceContext)
  const { balance, setBalance } = contextBalance

  return(
    <section>
      <h1>You Lose</h1>
      <h3>Balance: {balance}</h3>
    </section>
  )
}
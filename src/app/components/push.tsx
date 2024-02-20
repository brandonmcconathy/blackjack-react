import { BalanceContext, BetContext, StageContext } from "../../../lib/context"
import { useContext, useEffect } from "react"

export default function Push() {

  const contextBalance:any = useContext(BalanceContext)
  const contextBet:any = useContext(BetContext)
  const contextStage:any = useContext(StageContext)
  const { setStage } = contextStage
  const { balance, setBalance } = contextBalance
  const { bet, setBet } = contextBet

  useEffect(() => {
    setBalance((prevBalance:number) => prevBalance + bet)
  },[])
   
  setBet(0)

  return(
    <h1>Push</h1>
  )
}
import { StageContext } from "../lib/context"
import { useContext } from "react"

export default function compareScores(dealer: number, player: number) {

  const contextStage:any = useContext(StageContext)
  const { setStage } = contextStage

  if (dealer > 21 || player > dealer) {
    setStage('win')
  } else if (dealer > player) {
    setStage('lose')
  } else {
    setStage('push')
  }
}
import { useContext, useEffect, useState } from "react"
import CardDisplay from "./carddisplay"
import { BetContext, BalanceContext } from "../../../lib/context"
import drawCard from "../../../utils/drawcard"

export default function Play() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const { bet } = contextBet
  const { balance } = contextBalance

  const [ deckId, setDeckId ] = useState('')

  useEffect(() => {
    async function shuffle() {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      const data = await response.json()
      setDeckId(data.deck_id)
    }
    shuffle()
  },[])

  console.log(drawCard(deckId))

  return(
    <main className="flex flex-col justify-evenly text-center h-screen">
      <h1>{balance}</h1>
      <h1>Dealer</h1>
      <CardDisplay cards={['A', 'Q']} />
      <CardDisplay cards={['10', '4']} />
      <h1>Player</h1>
    </main>
  )
}
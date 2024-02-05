import { useContext, useEffect, useState } from "react"
import CardDisplay from "./carddisplay"
import { BetContext, BalanceContext } from "../../../lib/context"

export default function Play() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const { bet } = contextBet
  const { balance } = contextBalance

  const [ deckId, setDeckId ] = useState('')
  const [ player, setPlayer ] = useState([])
  const [ dealer, setDealer ] = useState([])

  useEffect(() => {
    async function shuffle() {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      const data = await response.json()
      setDeckId(data.deck_id)
    }
    shuffle()
  },[])

  const drawCard = async (setCards:any) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()
    setCards((prevCards:any) => ([...prevCards, data.cards[0]]))
  }

  return(
    <main className="flex flex-col justify-evenly text-center h-screen">
      <h1>{balance}</h1>
      <h1>Dealer</h1>
      <CardDisplay cards={['A', 'Q']} />
      <CardDisplay cards={['10', '4']} />
      <h1>Player</h1>
      <button onClick={drawCard(setPlayer)} className="bg-green-500 text-slate-800 px-3 py-1 rounded-xl text-xl font-semibold box-pop hover:bg-green-300 transition duration-300">Hit</button>
    </main>
  )
}
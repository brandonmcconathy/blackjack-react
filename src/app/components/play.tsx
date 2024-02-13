import { useContext, useEffect, useRef, useState } from "react"
import CardDisplay from "./carddisplay"
import { BetContext, BalanceContext } from "../../../lib/context"
import drawCard from "../../../util/drawcard"
import updateScore from "../../../util/updateScore"

export default function Play() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const { bet } = contextBet
  const { balance } = contextBalance

  const [ deckId, setDeckId ] = useState('')
  const [ player, setPlayer ] = useState({cards: new Array(), score: 0})
  const [ dealer, setDealer ] = useState({cards: new Array(), score: 0})

  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      startGame()
      isMounted.current = true
  }
  },[])

  async function shuffle() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const data = await response.json()
    setDeckId(data.deck_id)
    return data.deck_id
    }

  async function startGame() {
    const deck_id = await shuffle()
    setTimeout(() => {
      drawPlayerCard(deck_id)
      setTimeout(() => {
        drawDealerCard(deck_id)
        setTimeout(() => {
          drawPlayerCard(deck_id)
          setTimeout(() => {
            drawDealerCard(deck_id)
          },1000)
        },1000)
      },1000)
    },1000)
  }

  const drawPlayerCard = async (deckId:string) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()
    setPlayer((prevCards) => ({cards: [...prevCards.cards, data.cards[0]], score: updateScore([...prevCards.cards, data.cards[0]])}))
  }

  const drawDealerCard = async (deckId:string) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()
    setDealer((prevCards) => ({cards: [...prevCards.cards, data.cards[0]], score: updateScore([...prevCards.cards, data.cards[0]])}))
  }

  const handleClick = () => {
    drawPlayerCard(deckId)
  }

  return(
    <main className="flex flex-col justify-evenly text-center h-screen">
      <h1>{balance}</h1>
      <h1>{dealer.score}</h1>
      <CardDisplay cards={dealer.cards} />
      <CardDisplay cards={player.cards} />
      <h1>{player.score}</h1>
      <button onClick={handleClick} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Hit</button>
    </main>
  )
}
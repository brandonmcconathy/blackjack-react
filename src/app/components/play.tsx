import { useContext, useEffect, useRef, useState } from "react"
import CardDisplay from "./carddisplay"
import { BetContext, BalanceContext } from "../../../lib/context"
import checkCount from "../../../utils/checkCount"

export default function Play() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const { bet } = contextBet
  const { balance } = contextBalance

  const [ deckId, setDeckId ] = useState('')
  const [ player, setPlayer ] = useState(new Array())
  const [ dealer, setDealer ] = useState(new Array())

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
    console.log(deck_id)
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

  const updateCounts = () => {
    checkCount(player)
    checkCount(dealer)
  }

  const drawPlayerCard = async (deckId:string) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()
    setPlayer((prevCards) => ([...prevCards, data.cards[0]]))
  }

  const drawDealerCard = async (deckId:string) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()
    setDealer((prevCards) => ([...prevCards, data.cards[0]]))
    console.log('dealer')
  }

  const handleClick = () => {
    drawPlayerCard(deckId)
  }

  return(
    <main className="flex flex-col justify-evenly text-center h-screen">
      <h1>{balance}</h1>
      <h1>Dealer</h1>
      <CardDisplay cards={dealer} />
      <CardDisplay cards={player} />
      <h1>Player</h1>
      <button onClick={handleClick} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Hit</button>
    </main>
  )
}
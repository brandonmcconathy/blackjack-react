import { useContext, useEffect, useRef, useState } from "react"
import CardDisplay from "./carddisplay"
import { BetContext, BalanceContext } from "../../../lib/context"

export default function Play() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const { bet } = contextBet
  const { balance } = contextBalance

  const [ deckId, setDeckId ] = useState('')
  const [ player, setPlayer ] = useState({cards: new Array(), count: 0, aces:0})
  const [ dealer, setDealer ] = useState({cards: new Array(), count: 0, aces:0})

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

  const updateCount = (value:string, currCount:number, currAces:number) => {
    console.log('here')

    let newCount = 0

    if (value == 'KING' || value == 'QUEEN' || value == 'JACK') {
      return(10)
    } else if (value == 'ACE') {
      if ((currCount + 11) > 21) {
        return(1)
      }
      return(11)
    } else {
      return(Number(value))
    }
  }

  const drawPlayerCard = async (deckId:string) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()
    if (data.cards[0].value == 'ACE') {
      setPlayer((prevCards) => ({cards: [...prevCards.cards, data.cards[0]], count: prevCards.count += updateCount(data.cards[0].value, prevCards.count, prevCards.aces), aces: prevCards.aces++}))
    } else {
      setPlayer((prevCards) => ({cards: [...prevCards.cards, data.cards[0]], count: prevCards.count += updateCount(data.cards[0].value, prevCards.count, prevCards.aces), aces: prevCards.aces}))
    }
  }

  const drawDealerCard = async (deckId:string) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()
    if (data.cards[0].value == 'ACE') {
      setDealer((prevCards) => ({cards: [...prevCards.cards, data.cards[0]], count: prevCards.count += updateCount(data.cards[0].value, prevCards.count, prevCards.aces), aces: prevCards.aces++}))
    } else {
      setDealer((prevCards) => ({cards: [...prevCards.cards, data.cards[0]], count: prevCards.count += updateCount(data.cards[0].value, prevCards.count, prevCards.aces), aces: prevCards.aces}))
    }
  }

  const handleClick = () => {
    drawPlayerCard(deckId)
  }

  return(
    <main className="flex flex-col justify-evenly text-center h-screen">
      <h1>{balance}</h1>
      <h1>{dealer.count}</h1>
      <CardDisplay cards={dealer.cards} />
      <CardDisplay cards={player.cards} />
      <h1>{player.count}</h1>
      <button onClick={handleClick} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Hit</button>
    </main>
  )
}
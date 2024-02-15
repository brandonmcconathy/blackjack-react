import { useContext, useEffect, useRef, useState } from "react"
import CardDisplay from "./carddisplay"
import { BetContext, BalanceContext, StageContext } from "../../../lib/context"
import takeTurn from "../../../utils/takeTurn"

export default function Play() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const contextStage:any = useContext(StageContext)
  const { bet, setBet } = contextBet
  const { balance } = contextBalance
  const {stage, setStage} = contextStage

  const [ deckId, setDeckId ] = useState('')
  const [ player, setPlayer ] = useState({cards: new Array(), score: 0})
  const [ dealer, setDealer ] = useState({cards: new Array(), score: 0})
  const [ buttons, setButtons ] = useState({hit: false, stand: false, double: false})

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
    setTimeout(async () => {
      setPlayer(await takeTurn(player.cards, deck_id))
      setTimeout(async () => {
        setDealer(await takeTurn(dealer.cards, deck_id))
        setTimeout(async () => {
          setPlayer(await takeTurn(player.cards, deck_id))
          setTimeout(async () => {
            setDealer(await takeTurn(dealer.cards, deck_id))
            setButtons({hit: true, stand: true, double: (balance >= bet)})
          },1000)
        },1000)
      },1000)
    },1000)
  }

  const handleBet = async () => {
    setPlayer(await takeTurn(player.cards, deckId))
  }

  const handleStand = () => {
    setStage('again')
  }

  const handleDouble = () => {

  }

  return(
    <main className="flex flex-col justify-evenly text-center h-screen">
      <h1>{balance}</h1>
      <h1>{dealer.score}</h1>
      <CardDisplay cards={dealer.cards} />
      <CardDisplay cards={player.cards} />
      <h1>{player.score}</h1>
      <div className="flex items-center justify-center gap-6">
        <button onClick={handleBet} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Hit</button>
        <button onClick={handleStand} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Stand</button>
        <button onClick={handleDouble} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Double</button>
      </div>
    </main>
  )
}
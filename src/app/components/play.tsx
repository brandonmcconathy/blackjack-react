import { useContext, useEffect, useRef, useState } from "react"
import CardDisplay from "./carddisplay"
import { BetContext, BalanceContext, StageContext } from "../../../lib/context"
import takeTurn from "../../../utils/taketurn"
import updateScore from "../../../utils/updatescore"
import compareScores from "../../../utils/comparescores"

export default function Play() {

  const contextBet:any = useContext(BetContext)
  const contextBalance:any = useContext(BalanceContext)
  const contextStage:any = useContext(StageContext)
  const { bet, setBet } = contextBet
  const { balance, setBalance } = contextBalance
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
    const interval = 1000
    setTimeout(async () => {
      setPlayer(await takeTurn(player.cards, deck_id, false))
      setTimeout(async () => {
        setDealer(await takeTurn(dealer.cards, deck_id, false))
        setTimeout(async () => {
          setPlayer(await takeTurn(player.cards, deck_id, false))
          setTimeout(async () => {
            setDealer(await takeTurn(dealer.cards, deck_id, true))
            checkBlackjack()
          },interval)
        },interval)
      },interval)
    },interval)
  }

  const checkBlackjack = () => {
    if (updateScore(player.cards) == 21) {
      let tempDealer = dealer
      tempDealer.cards[1].down = false
      setDealer(tempDealer)
      if (updateScore(dealer.cards) != 21) {
        setTimeout(() => setStage('blackjack'), 1000)
      } else {
        setTimeout(() => setStage('push'), 1000)
      }
    } else {
      if (updateScore(dealer.cards) == 21) {
        let tempDealer = dealer
        tempDealer.cards[1].down = false
        setDealer(tempDealer)
        setTimeout(() => setStage('lose'), 1000)
      } else {
        setButtons({hit: true, stand: true, double: (balance >= bet)})
      }
    }
  }

  const checkBust = () => {
    if (updateScore(player.cards) > 21) {
      setButtons({hit: false, stand: false, double: false})
      let tempDealer = dealer
      tempDealer.cards[1].down = false
      tempDealer.score = updateScore(tempDealer.cards)
      setDealer(tempDealer)
      setTimeout(() => setStage('lose'), 1500)
    } else {
      setButtons({hit: true, stand: true, double: false})
    }
  }

  const handleHit = async () => {
    setPlayer(await takeTurn(player.cards, deckId, false))
    setButtons({hit: true, stand: true, double: false})
    checkBust()
  }

  const handleStand = () => {
    setButtons({hit: false, stand: false, double: false})
    dealerTurn()
  }

  const handleDouble = async () => {
    setBalance((prevBalance:number) => prevBalance - bet)
    setBet((prevBet:number) => prevBet * 2)
    setButtons({hit: false, stand: false, double: false})
    setPlayer(await takeTurn(player.cards, deckId, false))
    if (updateScore(player.cards) > 21) {
      let tempDealer = dealer
      tempDealer.cards[1].down = false
      tempDealer.score = updateScore(tempDealer.cards)
      setDealer(tempDealer)
      setTimeout(() => setStage('lose'), 1500)
    } else {
      dealerTurn()
    }
  }

  const dealerTurn = async () => {
    let tempDealer = dealer
    tempDealer.cards[1].down = false
    tempDealer.score = updateScore(tempDealer.cards)
    setDealer(tempDealer)
    while (tempDealer.score < 17) {
      setDealer(await takeTurn(dealer.cards, deckId, false))
      tempDealer.score = updateScore(dealer.cards)
    }
    const nextStage = compareScores(tempDealer.score, player.score)
    setTimeout(() => setStage(nextStage), 1000)
  }

  return(
    <main className="">
      <h1 className="text-right text-lg mr-12 mt-5">Balance: {balance}</h1>
      <div className="flex flex-col text-center h-screen mt-5">
        <h1 className="-mb-6">{dealer.score}</h1>
        <CardDisplay cards={dealer.cards} />
        <CardDisplay cards={player.cards} />
        <h1 className="-mt-6 mb-10">{player.score}</h1>
        <h1 className="mb-18 text-xl">Bet: {bet}</h1>
        <div className="flex items-center justify-center gap-6">
          {buttons.hit ?
          <button onClick={handleHit} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Hit</button> : 
          <button className="bg-gray-500 text-slate-800 px-4 py-1 rounded-xl text-2xl font-semibold box-pop transition duration-300" disabled>Hit</button>}
          {buttons.stand ?
          <button onClick={handleStand} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Stand</button> :
          <button className="bg-gray-500 text-slate-800 px-4 py-1 rounded-xl text-2xl font-semibold box-pop transition duration-300" disabled>Stand</button>}
          {buttons.double ?
          <button onClick={handleDouble} className="bg-green-500 text-slate-800 px-4 py-1 rounded-xl text-2xl self-center font-semibold box-pop hover:bg-green-300 transition duration-300">Double</button> :
          <button className="bg-gray-500 text-slate-800 px-4 py-1 rounded-xl text-2xl font-semibold box-pop transition duration-300" disabled>Double</button>}
        </div>
      </div>
    </main>
  )
}
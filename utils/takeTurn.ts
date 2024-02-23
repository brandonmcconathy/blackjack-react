import drawCard from "./drawcard"
import updateScore from "./updatescore"

export default async function takeTurn(cards:any[], deckId:string, down:boolean) {

    let newCards = cards
    newCards.push(await drawCard(deckId, down))
    let newScore = updateScore(newCards)

    return({cards: newCards, score: newScore})
}
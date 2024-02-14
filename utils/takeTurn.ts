import drawCard from "./drawcard"
import updateScore from "./updateScore"

export default async function takeTurn(cards:any[], deckId:string) {

    let newCards = cards
    newCards.push(await drawCard(deckId))
    let newScore = updateScore(newCards)

    return({cards: newCards, score: newScore})
}
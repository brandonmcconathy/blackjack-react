export default async function drawCard(deckId:string, down:boolean) {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()
    data.cards[0].down = down
    return(data.cards[0])
}
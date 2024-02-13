export default async function drawCard(deckId:string) {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const data = await response.json()
}
export default async function shuffle() {
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  const data = await response.json()
  return(data.deck_id)
}
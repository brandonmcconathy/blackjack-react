import CardDisplay from "./carddisplay"

export default function Play() {
  return(
    <main className="flex flex-col justify-evenly text-center h-screen">
      <h1>Dealer</h1>
      <CardDisplay cards={['A', 'Q']} />
      <CardDisplay cards={['10', '4']} />
      <h1>Player</h1>
    </main>
  )
}
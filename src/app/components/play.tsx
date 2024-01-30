import { useContext } from "react"
import CardDisplay from "./carddisplay"
import { BetContext } from "../../../lib/context"

export default function Play() {

  const context:any = useContext(BetContext)
  const { bet } = context

  return(
    <main className="flex flex-col justify-evenly text-center h-screen">
      <h1>Dealer</h1>
      <CardDisplay cards={['A', 'Q']} />
      <CardDisplay cards={['10', '4']} />
      <h1>Player</h1>
    </main>
  )
}
'use client'

import { useContext } from "react"
import { StageContext } from "../../../lib/stagecontext"

export default function PlayAgain() {

  const context = useContext(StageContext)
  const stage:string = context.stage
  const setStage = context.setStage
  console.log(stage)

  return(
    <main className="flex flex-col gap-10 justify-center items-center text-center mt-16">
      <h1 className="text-3xl">Play again?</h1>
      <div className="flex items-center justify-center gap-10 text-xl">
        <button onClick={function() {setStage('bet')}} className="bg-green-500 text-slate-800 px-3 py-1 rounded-xl text-xl font-semibold box-pop hover:bg-green-300 transition duration-300">Yes</button>
        <button onClick={function() {setStage('start')}} className="bg-green-500 text-slate-800 px-3 py-1 rounded-xl text-xl font-semibold box-pop hover:bg-green-300 transition duration-300">No</button>
      </div>
    </main>
  )
}
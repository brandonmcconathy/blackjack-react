'use client'

import { useState } from "react"
import { StageContext } from "../../lib/context"
import { BetContext } from "../../lib/context"

export function Providers({ children }:any) {

  const [ stage, setStage ] = useState('start')
  const [ bet, setBet ] = useState(0)
  
  return(
    <StageContext.Provider value={{stage, setStage}}>{children}</StageContext.Provider>
  )
}
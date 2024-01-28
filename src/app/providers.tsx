'use client'

import { useState } from "react"
import { StageContext } from "../../lib/stagecontext"

export function Providers({ children }:any) {

  const [ stage, setStage ] = useState('start')
  
  return(
    <StageContext.Provider value={{stage, setStage}}>{children}</StageContext.Provider>
  )
}
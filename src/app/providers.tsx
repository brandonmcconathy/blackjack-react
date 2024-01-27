'use client'

import { useState } from "react"
import { StageContext } from "../../lib/stagecontext"

export function Providers({ children }:any) {

  const [ stage, setStage ] = useState(null)
  
  return(
    <StageContext.Provider value={stage}>{children}</StageContext.Provider>
  )
}
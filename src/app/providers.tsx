'use client'

import { useState } from "react"
import { StageContext } from "../../lib/context"
import { BetContext } from "../../lib/context"
import { BalanceContext } from "../../lib/context"

export function Providers({ children }:any) {

  const [ stage, setStage ] = useState('start')
  const [ bet, setBet ] = useState(0)
  const [ balance,setBalance ] = useState(100)
  
  return(
    <StageContext.Provider value={{stage, setStage}}>
      <BalanceContext.Provider value={{balance, setBalance}}>
        <BetContext.Provider value={{bet, setBet}}>
          {children}
        </BetContext.Provider>
      </BalanceContext.Provider>
    </StageContext.Provider>
  )
}
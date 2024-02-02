import { useState, useContext, useEffect } from "react"
import { StageContext, BetContext, BalanceContext } from "../../../lib/context"

export default function Bet() {

    const contextStage:any = useContext(StageContext)
    const contextBet:any = useContext(BetContext)
    const contextBalance:any = useContext(BalanceContext)
    const { setStage } = contextStage
    const { bet, setBet } = contextBet
    const { balance, setBalance } = contextBalance

    const [validBet, setValidBet] = useState(false)

    

    const placeBet = () => {
        setBalance((prevBalence:any) => prevBalence - bet)
        setStage('play')
    }

    const betValues = {positive: ['1','5','10','25'], negative: ['-1','-5','-10','-25']}

    return(
        <main className="flex flex-col gap-5 justify-center items-center text-center mt-16">
            <h1 className="text-2xl font-semibold">Place your bet:</h1>
            <h2 className="text-xl">{bet}</h2>
            <div className="flex flex-col justify-center items-center text-center gap-5">
                <div className="flex justify-center items-center gap-5">
                    {betValues.positive.map((value) => <BetButton value={Number(value)} name='positive' setValidBet={setValidBet} bet={bet} setBet={setBet} balance={balance} key={value} />)}
                </div>
                <div className="flex justify-center items-center gap-5">
                    {betValues.negative.map((value) => <BetButton value={Number(value)} name='negative' setValidBet={setValidBet} bet={bet} setBet={setBet} balance={balance} key={value} />)}
                </div>
            </div>
            {validBet ? 
            <button onClick={placeBet} className="bg-green-500 text-slate-800 px-3 py-1 rounded-xl text-xl font-semibold box-pop hover:bg-green-300 transition duration-300">Place Bet</button> :
            <button className="bg-gray-500 text-slate-800 px-3 py-1 rounded-xl text-xl font-semibold box-pop transition duration-300" disabled>Place Bet</button>
            }
            <h1>{balance}</h1>
        </main>
    )
}

function BetButton(props: {value:number, name:string, setValidBet:any, bet:number, setBet:any, balance:number}) {

    const { value, name, setValidBet, bet, setBet, balance } = props

    const [ valid, setValid ] = useState(true)

    useEffect(() =>{
        const checkValid = () => {
            if (name == 'positive') {
                if (balance - bet - value < 0) {
                    setValid(false)
                } else {
                    setValid(true)
                }
            }  
        }
        checkValid()
    },[bet])

    const handleBet = () => {
        if (name == 'positive') {
            setBet((prevBet:any) => prevBet + value)
            setValidBet(true)
        } else {
            setBet((prevBet:any) => prevBet + value)
            if (bet <= value) {
                setBet(0)
                setValidBet(false)
            }
        }
    }

    return(
        <>
        {valid ? 
            <button name={name} value={value} className="bg-amber-200 text-xl w-24 h-24 text-black rounded-full py-5 px-7 box-pop text-center" onClick={handleBet}>{value}</button> :
            <button name={name} value={value} className="bg-gray-500 text-xl w-24 h-24 text-black rounded-full py-5 px-7 box-pop text-center" onClick={handleBet} disabled>{value}</button>}
        </>
    )
}
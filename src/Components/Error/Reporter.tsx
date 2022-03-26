import React, { PropsWithChildren, useState } from "react"
import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"

type Props = PropsWithChildren<{}>
type BubbleData = { title: string, body: string, data?: object, error: boolean }
type BubbleProps = { data: BubbleData, removeSelf: () => void }
type ReportFunc = (title: string, body: string, data?: object) => void

export function Bubble({ data, removeSelf }: BubbleProps) {
    const bg = data.error ? "#dc2626" : "#06b6d4"
    const type = data.error ? "Chyba" : "Upozornění"

    return (
        <AnimatePresence>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }}>
                <SBubble bg={bg}>
                    <button onClick={removeSelf}>Zavřít</button>
                    <SBubbleType>{type}</SBubbleType>
                    <SBubbleTitle>{data.title}</SBubbleTitle>
                    <SBubbleBody>{data.body}</SBubbleBody>
                    {data.data
                        ? <SBubbleData>
                            <span>Data:</span>
                            <SBubbleDataJson>{JSON.stringify(data.data, null, 2)}</SBubbleDataJson>
                        </SBubbleData>
                        : ""}
                </SBubble>
            </motion.div>
        </AnimatePresence>
    )
}

interface SBubbleProps {
    bg: string
}

const SBubble = styled.div<SBubbleProps>`
    background: ${props => props.bg};
    padding: 1.5ex;
    color: white;
    border-radius: 12px;
    transition: transform 500ms ease-in-out;
`
const SBubbleTitle = styled.div`
    font-weight: 500;
    font-size: 1.1em;
`
const SBubbleBody = styled.div`
    margin-left: 1ex;
`
const SBubbleType = styled.div`
    font-weight: 300;
    text-align: end;
    padding-top: 0.3ex;
`
const SBubbleData = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
`
const SBubbleDataJson = styled.div`
    font-family: monospace;
    font-size: 0.9em;
    padding-left: 0.5ex;
    overflow-x: hidden;
`

type ContextType = { log: ReportFunc, error: ReportFunc }
export const ReporterContext = React.createContext({} as ContextType)
export default function Reporter(props: Props) {
    const [bubbles, setBubbles] = useState([] as BubbleData[])
    const Log: ReportFunc = (title, body, data) => {
        setBubbles([...bubbles, { body, title, data, error: false }])
    }
    const LogError: ReportFunc = (title, body, data) => {
        setBubbles([...bubbles, { body, title, data, error: true }])
    }

    return <ReporterContext.Provider value={{ error: LogError, log: Log }}>
        <SReporter>
            {bubbles.map(x => <Bubble data={x} removeSelf={() => setBubbles(bubbles.filter(y => y != x))} />)}
        </SReporter>
        {props.children}
    </ReporterContext.Provider>
}

const SReporter = styled.div`
    position: fixed;
    left: 5vw;
    bottom: 10vh;
    top: 0;
    width: 20vw;
    z-index: 100;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1ex;
`

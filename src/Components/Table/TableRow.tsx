import { Participant } from "../../graphql/graphql"
import React, { ChangeEvent, CSSProperties, PropsWithChildren, useContext, useState } from "react"
import styled from "styled-components"
import { Box } from "@chakra-ui/react"

type ContextType = { participant: Participant }
const RowContext = React.createContext<ContextType>({} as ContextType)

export function TableRow({ i, participant }: { i: number, participant: Participant }) {
    const [context, setContext] = useState<ContextType>({ participant })

    return <RowContext.Provider value={context}>
        <RowStyle style={{ background: (i % 2 == 0) ? "#E0E0E0" : "#EAEAEA" }}>
            <BindCellStatic index="id" />
            <BindCell index="participantName" />
            <BindCell index="participantSurname" />
            <BindCell index="parentName" />
            <BindCell index="parentSurname" />
            <BindCell index="email" />
            <BindCell index="phone" />
            <BindCell index="school" />
            <BindCellStatic index="ip" />
            <BindCellStatic index="variableSymbol" />

            <BindCellStatic index="signUpDate" />
            <BindCellStatic index="dueDate" />
            <BindCellStatic index="paidDate" />
        </RowStyle>
    </RowContext.Provider>
}

export function BindCell({ index }: { index: keyof Participant }) {
    const context = useContext(RowContext)
    const participant = context.participant

    const [localValue, setLocalValue] = useState(participant[index])

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setLocalValue(e.target.value)
    }

    return <Cell>
        <RowInput type="text" value={localValue} onChange={onChange} />
    </Cell>
}

export function BindCellStatic({ index }: { index: keyof Participant }) {
    const context = useContext(RowContext)
    const participant = context.participant
    const emptyLine = <span style={{ display: "flex", placeContent: "center" }}>
        <Box width="7ex" borderBottom="1.75px solid black" paddingTop="1em" />
    </span>

    return <Cell style={{ textAlign: "center" }}>{participant[index] ?? emptyLine}</Cell>
    // TODO: Center empty field
}

export function Cell({ children, style }: PropsWithChildren<{ style?: CSSProperties }>) {
    return <DataStyle style={style}>{children}</DataStyle>
}

const RowInput = styled.input`
    width: 100%;
    height: 100%;
    background: transparent;
`
const RowStyle = styled.tr`
    height: 1px; // Get around CSS problems
`
const DataStyle = styled.td`
    height: inherit;
`

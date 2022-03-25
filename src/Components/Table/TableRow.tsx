import { Participant } from "../../graphql/graphql"
import React, { ChangeEvent, CSSProperties, PropsWithChildren, useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Box } from "@chakra-ui/react"
import { TableContext } from "../Views/Dashboard"

type updatePropertyStringType = (prop: keyof Participant, value: string) => void
type ContextType = { participant: Participant, changes: { [id: number]: Partial<Participant> }, updatePropertyString: updatePropertyStringType }
const RowContext = React.createContext<ContextType>({} as ContextType)

export function TableRow({ i, participant }: { i: number, participant: Participant }) {
    const { updateRowProperty } = useContext(TableContext)

    useEffect(() => {
        setContext({...context, changes: {}})
    }, [participant])

    type StateType = Omit<ContextType, "participant">
    const [context, setContext] = useState<StateType>({ changes: {}, updatePropertyString })

    function updatePropertyString(prop: keyof Participant, value: string) {
        updateRowProperty(participant.id, prop, value)
    }

    return <RowContext.Provider value={{ ...context, participant }}>
        <RowStyle style={{ background: (i % 2 != 0) ? "#E0E0E0" : "#EAEAEA" }}>
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
    const edited = localValue != participant[index]

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setLocalValue(e.target.value)
    }

    function saveValue() {
        if (localValue == participant[index]) return;
        context.updatePropertyString(index, localValue)
    }

    return <Cell>
        <RowInput type="text" edited={edited} value={localValue} onChange={onChange} onBlur={saveValue} />
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

const RowInput = styled.input<{ edited: boolean }>`
    width: 100%;
    height: 100%;
    background: ${props => props.edited ? "#fdfebc" : "inherit"};
    color: black;

    transition: all 250ms ease-in-out;
`
const RowStyle = styled.tr`
    height: 2em;
    white-space: nowrap;
`
const DataStyle = styled.td`
    height: inherit;
    padding: 0;
`

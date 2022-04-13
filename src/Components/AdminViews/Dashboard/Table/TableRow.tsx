import {
    GetParticipantsDocument,
    Participant,
    ParticipantStatus,
    useRemoveParticipantMutation
} from "../../../../graphql/graphql"
import React, { ChangeEvent, CSSProperties, PropsWithChildren, useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import { setProperty } from "../../../../store/table"
import { usePrevious } from "../../../../hooks/usePrevious"
import { DateTime } from "luxon"
import { CloseIcon, DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons"
import { Resolve } from "./statusResolver"

type ContextType = { participant: Participant }
const RowContext = React.createContext<ContextType>({} as ContextType)

export function TableRow({ i, participant }: { i: number, participant: Participant }) {
    const toast = useToast()
    const [removeParticipantMutation] = useRemoveParticipantMutation({
        refetchQueries: [GetParticipantsDocument]
    })

    function notImplemented() {
        toast({ title: "Funkce není implementována", status: "error" })
    }

    function removeParticipant() {
        removeParticipantMutation({ variables: { id: participant.id } })
    }

    let textColor = "black"
    let idColor = "#555555"
    const status = Resolve(participant)
    switch (participant.status) {
        case ParticipantStatus.Canceled:
            textColor = "#686868"
            idColor = "#BEBEBE"
            break
        case ParticipantStatus.PaidUnconfirmed:
            idColor = "#8F8000"
            break
        case ParticipantStatus.UnpaidLate:
            idColor = "#AC1821"
            break
        case ParticipantStatus.Error:
            textColor = "#F00"
            break
    }

    return <RowContext.Provider value={{ participant }}>
        <STyle style={{ background: (i % 2 != 0) ? "#E0E0E0" : "#EAEAEA", color: textColor }}>
            <BindCellStatic index="id" style={{ color: idColor, fontWeight: 500, fontSize: "1.1em" }} />
            <SplitDiv>
                <BindCell index="participantName" />
                <BindCell index="parentName" />
            </SplitDiv>
            <SplitDiv>
                <BindCell index="participantSurname" />
                <BindCell index="parentSurname" />
            </SplitDiv>
            <ThreeSplitDiv>
                <BindCell index="school" />
                <BindCell index="phone" />
                <BindCell index="email" />
                <BindCellStatic index="ip" />
            </ThreeSplitDiv>
            <BindCellStatic index="variableSymbol" style={{ fontWeight: 500, fontSize: "1.3em" }} />

            <BindCellDateStatic index="signUpDate" />
            <BindCellDateStatic index="dueDate" />
            <BindCellDateStatic index="paidDate" />
            <Cell>
                <Button size="sm" mx="1em" px="1.75em" bg={status.color}>
                    {status.icon}
                </Button>
            </Cell>
            <Cell>
                <Menu>
                    <MenuButton as={Button} size="sm" variant="ghost" mx="1ex">
                        <SettingsIcon />
                    </MenuButton>
                    <MenuList zIndex={200}>
                        <MenuItem icon={<EditIcon />} onClick={notImplemented}>Ukázat poznámku</MenuItem>
                        <MenuItem icon={<CloseIcon />} onClick={notImplemented}>Zrušit přihlášku</MenuItem>
                        <MenuItem icon={<DeleteIcon />} onClick={removeParticipant}>Odstranit přihlášku</MenuItem>
                    </MenuList>
                </Menu>
            </Cell>
        </STyle>
    </RowContext.Provider>
}

export function BindCellDateStatic({ index }: { index: keyof Participant }) {
    const context = useContext(RowContext)
    const participant = context.participant
    const emptyLine = <span style={{ display: "flex", placeContent: "center" }}>
        <Box width="7ex" borderBottom="1.75px solid black" paddingTop="1em" />
    </span>

    const date = participant[index]
        ? DateTime.fromISO(participant[index])
        : null
    const dateString = date?.toLocaleString(DateTime.DATETIME_MED, { locale: "cs" })

    return <Cell
        style={{ textAlign: "center" }}>{dateString ?? emptyLine}</Cell>
    // TODO: Center empty field
}

export function BindCell({ index, passedStyle }: { index: keyof Participant, passedStyle?: CSSProperties }) {
    const { participant } = useContext(RowContext)
    const changes = useSelector((state: RootState) => state.table.changes)
    const dispatch = useDispatch()

    useEffect(() => {
        if (changesValue) setLocalValue(changesValue)
        else if (prevChangesValue && !changesValue) setLocalValue(staticValue)
    }, [changes])

    const changesValue = changes[participant.id]?.[index]
    const prevChangesValue = usePrevious(changesValue as string)
    const staticValue = participant[index]
    const [localValue, setLocalValue] = useState(staticValue)
    const edited = localValue != staticValue

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setLocalValue(e.target.value)
    }

    function onBlur() {
        if (localValue == staticValue) return
        dispatch(setProperty({ value: localValue, prop: index, id: participant.id }))
    }

    return <Cell style={passedStyle}>
        <SInput type="text" edited={edited} value={localValue} onChange={onChange} onBlur={onBlur} />
    </Cell>
}

export function BindCellStatic({ index, style }: { index: keyof Participant, style?: CSSProperties }) {
    const context = useContext(RowContext)
    const participant = context.participant
    const emptyLine = <span style={{ display: "flex", placeContent: "center" }}>
        <Box width="7ex" borderBottom="1.75px solid black" paddingTop="1em" />
    </span>

    return <Cell style={{ textAlign: "center", ...style }}>{participant[index] ?? emptyLine}</Cell>
    // TODO: Center empty field
}

export function Cell({ children, style }: PropsWithChildren<{ style?: CSSProperties }>) {
    return <SData style={style}>{children}</SData>
}

function SplitDiv({ children }: PropsWithChildren<{}>) {
    return <Cell>
        <SSplitDiv rows="1fr 1fr">{children}</SSplitDiv>
    </Cell>
}

export const SSplitDiv = styled.div<{ rows: string }>`
    display: grid;
    grid-template-rows: ${props => props.rows};
`

const SThreeSplitDiv = styled(SSplitDiv)`
    grid-template-columns: 1fr 1.5fr 1fr;

    & :first-child {
        grid-column: 1 / 4;
        grid-row: 1;
    }
`

function ThreeSplitDiv({ children }: PropsWithChildren<{}>) {
    return <Cell>
        <SThreeSplitDiv rows="1fr 1fr">
            {children}
        </SThreeSplitDiv>
    </Cell>
}


const SInput = styled.input<{ edited: boolean }>`
    width: 100%;
    height: 100%;
    background: ${props => props.edited ? "#fdfebc" : "inherit"};

    transition: all 250ms ease-in-out;
`
const STyle = styled.tr`
    height: 2em;
    white-space: nowrap;
`
const SData = styled.td`
    height: inherit;
    padding: 0;
`

import {
    GetEmailStatisticsDocument,
    GetParticipantsDocument,
    GetStatisticsDocument,
    Participant,
    ParticipantStatus,
    useClearPaidMutation,
    useForceCancelationStatusMutation,
    useRemoveParticipantMutation
} from "../../../../graphql/graphql"
import React, { ChangeEvent, CSSProperties, PropsWithChildren, useRef } from "react"
import styled from "styled-components"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Grid,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tooltip,
    useDisclosure,
    useToast
} from "@chakra-ui/react"
import { DateTime } from "luxon"
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons"
import { Resolve } from "./statusResolver"
import { useApolloClient } from "@apollo/client"
import { useTableCell } from "../../../../hooks/useTableCell"

type ContextType = { participant: Participant }
export const RowContext = React.createContext<ContextType>({} as ContextType)

export function TableRow({ i, participant }: { i: number, participant: Participant }) {
    const toast = useToast()
    const apollo = useApolloClient()
    const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure()
    const deleteRef = useRef<any>()
    const [removeParticipantMutation] = useRemoveParticipantMutation({
        refetchQueries: [GetParticipantsDocument, GetStatisticsDocument, GetEmailStatisticsDocument]
    })
    const [forceCancelationMutation] = useForceCancelationStatusMutation({
        refetchQueries: [GetParticipantsDocument, GetStatisticsDocument]
    })

    function notImplemented() {
        toast({ title: "Funkce není implementována", status: "error" })
    }

    function removeParticipant() {
        removeParticipantMutation({ variables: { id: participant.id } })
    }

    const isCanceled = participant.status === "CANCELED"

    function forceCancelationStatus() {
        forceCancelationMutation({ variables: { id: participant.id, value: !isCanceled } })
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
            <BindCellDate index="dueDate" />
            <BindCellDate index="paidDate" />
            <Cell>
                <Tooltip hasArrow placement="left" label={status.tooltip}>
                    <Button size="sm" mx="1em" px="1.75em" bg={status.color}
                            _hover={{ background: "gray" }}
                            onClick={() => status.execute(participant, apollo)}>
                        {status.icon}
                    </Button>
                </Tooltip>
            </Cell>
            <Cell>
                <Menu>
                    <MenuButton as={Button} size="sm" variant="ghost" mx="1ex" color="black">
                        <SettingsIcon />
                    </MenuButton>
                    <MenuList zIndex={200}>
                        <MenuItem icon={<EditIcon />} onClick={notImplemented}>Ukázat poznámku</MenuItem>
                        <MenuItem icon={isCanceled ? <CheckIcon /> : <CloseIcon />} onClick={forceCancelationStatus}>
                            {isCanceled
                                ? "Odstranit zrušení"
                                : "Zrušit přihlášku"}
                        </MenuItem>
                        <MenuItem icon={<DeleteIcon />} onClick={deleteOnOpen}>
                            Odstranit přihlášku
                            <AlertDialog leastDestructiveRef={deleteRef} isOpen={deleteIsOpen} onClose={deleteOnClose}>
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>Odstranit přihlášku</AlertDialogHeader>
                                        <AlertDialogBody>
                                            Jste si jisti? Odstranění přihlášky smaže všechny neuložené změny. Tato
                                            změna nejde vrátit.
                                        </AlertDialogBody>
                                        <AlertDialogFooter>
                                            <Button onClick={deleteOnClose} ref={deleteRef} mr="1rem">Zrušit</Button>
                                            <Button onClick={removeParticipant} colorScheme="red">
                                                Odstranit přihlášku
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Cell>
        </STyle>
    </RowContext.Provider>
}

export function BindCellDate({ index }: { index: keyof Participant }) {
    const { localValue, setLocalValue, storeChange, edited, staticParticipant } = useTableCell(index)
    const inputRef = useRef<HTMLInputElement>(null)

    const [clearPaid] = useClearPaidMutation({
        refetchQueries: [GetParticipantsDocument, GetStatisticsDocument, GetEmailStatisticsDocument]
    })

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setLocalValue(e.target.value)
    }
    function onBlur() {
        storeChange(localValue)
    }

    async function onClear() {
        await clearPaid({ variables: { id: staticParticipant.id } })
        setLocalValue(null)
        storeChange(null)
        if (inputRef.current?.value) {
            inputRef.current!.value = ""
        }
    }

    return <Cell
        style={{ background: edited ? "#fdfebc" : "inherit" }}>
        <Grid gridTemplateColumns="9fr 1fr" alignItems="stretch">
            <Input type="date" onChange={onChange} onBlur={onBlur} value={localValue} ref={inputRef} />
            <Button variant="link"
                    onClick={onClear} visibility={index == "paidDate" ? "visible" : "hidden"}>
                <CloseIcon color="red.600" />
            </Button>
        </Grid>
    </Cell>
}

export function BindCellDateStatic({ index }: { index: keyof Participant }) {
    const { staticValue } = useTableCell(index)
    const date = staticValue
        ? DateTime.fromISO(staticValue)
        : null
    const dateString = date?.toLocaleString(DateTime.DATETIME_MED, { locale: "cs" })

    const emptyLine = <span style={{ display: "flex", placeContent: "center" }}>
        <Box width="7ex" borderBottom="1.75px solid black" paddingTop="1em" />
    </span>

    return <Cell style={{ textAlign: "center" }}>{dateString ?? emptyLine}</Cell>
}

export function BindCell({ index, passedStyle }: { index: keyof Participant, passedStyle?: CSSProperties }) {
    const { localValue, setLocalValue, edited, storeChange } = useTableCell(index)

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setLocalValue(e.target.value)
    }
    function onBlur() {
        storeChange(localValue)
    }

    return <Cell style={passedStyle}>
        <SInput type="text" edited={edited} value={localValue} onChange={onChange} onBlur={onBlur} />
    </Cell>
}

export function BindCellStatic({ index, style }: { index: keyof Participant, style?: CSSProperties }) {
    const { staticValue } = useTableCell(index)

    const emptyLine = <span style={{ display: "flex", placeContent: "center" }}>
        <Box width="7ex" borderBottom="1.75px solid black" paddingTop="1em" />
    </span>

    return <Cell style={{ textAlign: "center", ...style }}>{staticValue ?? emptyLine}</Cell>
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

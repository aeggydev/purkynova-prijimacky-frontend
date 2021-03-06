import { Participant } from "../../../../graphql/graphql"
import { PropsWithChildren } from "react"
import styled from "styled-components"
import { SSplitDiv } from "./TableRow"
import { Thead, Tr } from "@chakra-ui/react"

export function TableHeader() {
    return <Thead bg="#18AC6A" color="#fff" pos="sticky" top="0" fontSize="0.925em" zIndex={100}>
        <Tr>
            <BindHeader index="id">ID</BindHeader>
            <SplitCell>
                <BindHeader index="participantName">Jméno úč.</BindHeader>
                <Separator />
                <BindHeader index="parentName">Jméno zást.</BindHeader>
            </SplitCell>
            <SplitCell>
                <BindHeader index="participantSurname">Příjmn. úč.</BindHeader>
                <Separator />
                <BindHeader index="parentSurname">Příjm. zást.</BindHeader>
            </SplitCell>
            <ThreeSplitDiv>
                <BindHeader index="school" noRightBorder>Základní škola, obec</BindHeader>
                <Separator />
                <BindHeader index="phone" noLeftBorder noRightBorder>Telefon</BindHeader>
                <BindHeader index="email">E-mail zákonného zástupce</BindHeader>
                <BindHeader index="ip" noRightBorder>IP adresa</BindHeader>
            </ThreeSplitDiv>
            <BindHeader index="variableSymbol">Variabilní symbol</BindHeader>
            <BindHeader index="signUpDate">Datum a čas přihlášení</BindHeader>
            <BindHeader index="dueDate">Datum splatnosti</BindHeader>
            <BindHeader index="paidDate">Datum uhrazení</BindHeader>
            <SHeader noLeftBorder noRightBorder />
            <SHeader noLeftBorder noRightBorder />
        </Tr>
    </Thead>
}

interface BindHeaderProps {
    index: keyof Participant
    noLeftBorder?: boolean
    noRightBorder?: boolean
}

const SThreeSplitDiv = styled(SSplitDiv)`
    grid-template-columns: 1fr 1.5fr 1fr;
    align-items: center;

    & :first-child {
        grid-column: 1 / 4;
        grid-row: 1;
    }

    & :nth-child(2) {
        grid-column: 1 / 4;
        grid-row: 2;
    }
`

function ThreeSplitDiv({ children }: PropsWithChildren<{}>) {
    return <SHeader style={{ padding: 0, borderWidth: 0 }}>
        <SThreeSplitDiv rows="1fr auto 1fr">{children}</SThreeSplitDiv>
    </SHeader>
}

function SplitCell({ children }: PropsWithChildren<{}>) {
    return <SHeader style={{ padding: 0, borderWidth: 0 }}>
        <SSplitDiv rows="1fr auto 1fr">{children}</SSplitDiv>
    </SHeader>
}

function BindHeader({ index, children, noLeftBorder, noRightBorder }: PropsWithChildren<BindHeaderProps>) {
    return <SHeader noLeftBorder={noLeftBorder} noRightBorder={noRightBorder}>{children}</SHeader>
}

const Separator = styled.div`
    background: white;
    height: 0.5px;
    width: 100%;
`
const SHeader = styled.th<{ noLeftBorder?: boolean, noRightBorder?: boolean }>`
    border: white 0 solid;
    border-left-width: ${props => props.noLeftBorder ? 0 : "0.5px"};
    border-right-width: ${props => props.noRightBorder ? 0 : "0.5px"};
    padding: 0.5ex 1ex;

    &:first-child, &:last-child {
        border-left-width: 0;
    }
`

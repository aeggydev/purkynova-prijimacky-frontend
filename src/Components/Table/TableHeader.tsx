import { Participant } from "../../graphql/graphql"
import { PropsWithChildren } from "react"
import styled from "styled-components"
import { SSplitDiv } from "./TableRow"

export function TableHeader() {
    return <SHead>
        <tr>
            <BindHeader index="id">ID</BindHeader>
            <SplitCell>
                <BindHeader index="participantName">Jméno úč.</BindHeader>
                <Separator />
                <BindHeader index="parentName">Jméno zást.</BindHeader>
            </SplitCell>
            <SplitCell>
                <BindHeader index="participantSurname" noRightBorder={true}>Příjmn. úč.</BindHeader>
                <Separator />
                <BindHeader index="parentSurname" noRightBorder={true}>Příjm. zást.</BindHeader>
            </SplitCell>
            <BindHeader index="email">E-mail zákonného zástupce</BindHeader>
            <BindHeader index="phone">Telefon</BindHeader>
            <BindHeader index="school">Základní škola, obec</BindHeader>
            <BindHeader index="ip">IP adresa</BindHeader>
            <BindHeader index="variableSymbol">Variabilní symbol</BindHeader>
            <BindHeader index="signUpDate">Datum a čas přihlášení</BindHeader>
            <BindHeader index="dueDate">Datum splatnosti</BindHeader>
            <BindHeader index="paidDate">Datum uhrazení</BindHeader>
        </tr>
    </SHead>
}

interface BindHeaderProps {
    index: keyof Participant
    noLeftBorder?: boolean
    noRightBorder?: boolean
}

function SplitCell({ children }: PropsWithChildren<{}>) {
    return <SHeader style={{ padding: 0, borderWidth: 0 }}><SSplitDiv
        rows="1fr auto 1fr">{children}</SSplitDiv></SHeader>
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
const SHead = styled.thead`
    background: #18AC6A;
    color: #FFFFFF;
    position: sticky;
    top: 0;
`

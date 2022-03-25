import { Participant } from "../../graphql/graphql"
import { PropsWithChildren } from "react"
import styled from "styled-components"

export function TableHeader() {
    return <thead>
    <tr>
        <BindHeader index="id">ID</BindHeader>
        <BindHeader index="participantName">Jméno úč.</BindHeader>
        <BindHeader index="participantSurname">Příjmn. úč.</BindHeader>
        <BindHeader index="parentName">Jméno zást.</BindHeader>
        <BindHeader index="parentSurname">Příjm. zást.</BindHeader>
        <BindHeader index="email">E-mail zákonného zástupce</BindHeader>
        <BindHeader index="phone">Telefon</BindHeader>
        <BindHeader index="school">Základní škola, obec</BindHeader>
        <BindHeader index="ip">IP adresa</BindHeader>
        <BindHeader index="variableSymbol">Variabilní symbol</BindHeader>
        <BindHeader index="signUpDate">Datum a čas přihlášení</BindHeader>
        <BindHeader index="dueDate">Datum splatnosti</BindHeader>
        <BindHeader index="paidDate">Datum uhrazení</BindHeader>
    </tr>
    </thead>
}

interface BindHeaderProps {
    index: keyof Participant
}

function BindHeader({ index, children }: PropsWithChildren<BindHeaderProps>) {
    return <Header>{children}</Header>
}

function Header({ children }: PropsWithChildren<{}>) {
    return <StyledHeader>
        {children}
    </StyledHeader>
}

const StyledHeader = styled.th`
    position: sticky;
    top: 0;

    background: #18AC6A;
    color: #FFFFFF;
    border: white 0 solid;
    border-left-width: 0.5px;
    border-right-width: 0.5px;
    padding: 0.5ex 1ex;

    &:first-child, &:last-child {
        border-left-width: 0;
    }
`

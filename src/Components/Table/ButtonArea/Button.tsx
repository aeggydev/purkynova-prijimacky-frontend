import styled from "styled-components"
import { ReactElement } from "react"

interface ButtonProps {
    text: string
    click: () => void
    icon: ReactElement

    bg: string
}

export function Button({text, icon, click, bg}: ButtonProps) {
    return <StyledButton bg={bg} onClick={click}>
        <span>{icon}</span>
        <span>{text}</span>
        <span></span>
    </StyledButton>
}

interface StyledButtonProps {
    bg: string
}

const StyledButton = styled.button<StyledButtonProps>`
    text-transform: uppercase;
    background: ${props => props.bg};
    color: white;
    padding: 0.75em 0.5em;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5em;

    font-weight: 500;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
`

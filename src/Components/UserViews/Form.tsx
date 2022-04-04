import { Box } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"
import { DummyApplicationCount } from "./Reusable/ApplicationCount"
import ContentContainer from "../Containers/ContentContainer"
import SignUpForm from "./SignUpForm/Form"

interface RowProps {
    row: number;
}

export const Row = ({ children, row }: PropsWithChildren<RowProps>) => <>
    <Box gridRow={row} gridColumn={1}
         display="grid" gridGap="12px" gridAutoFlow="column">
        {children}
    </Box></>

export default function Form() {
    // TODO: Add an option for people who are already 18

    return <ContentContainer>
        <DummyApplicationCount />
        <SignUpForm />
    </ContentContainer>
}

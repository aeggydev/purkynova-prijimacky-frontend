import ShadowBox from "../../Containers/ShadowBox"
import { Box } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"
import ContentContainer from "../../Containers/ContentContainer"
import ApplicationCount from "../Reusable/ApplicationCount"
import Form from "./Form"

interface RowProps {
    row: number;
}

export const Row = ({ children, row }: PropsWithChildren<RowProps>) => (
    <Box gridRow={row} gridColumn={1}
         display="grid" gridGap="12px" gridAutoFlow="column">
        {children}
    </Box>
)

export default function DForm() {
    return (
        <ContentContainer>
            <ApplicationCount />
            <ShadowBox mx="4em" position="relative" alignContent="center">
                <Form />
            </ShadowBox>
        </ContentContainer>
    )
}

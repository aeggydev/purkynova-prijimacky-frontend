import { Box, Button } from "@chakra-ui/react"
import React, { PropsWithChildren, useState } from "react"
import { DummyApplicationCount } from "../ApplicationCount"
import ContentContainer from "../Containers/ContentContainer"
import Form from "../SignUpForm/Form"

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
    <Form />
  </ContentContainer>
}

import { Box } from "@chakra-ui/react";
import styled from "styled-components"
import React from "react"

const Paragraph = styled.p`
  margin-bottom: 1em;
  font-weight: 500;
  line-height: 24px;
`

// TODO: Add support for narrower layouts
export default function Welcome() {
  return <Box textAlign="center" my="2.5%" mx="3%" px="7em">
    <Box boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" rounded="5px" mb="2.5%" py="1em" bg="#F9F9F9" display="flex" justifyContent="center" alignItems="center">
      <Paragraph style={{marginBottom: 0}}>Přihlášky přijímáme od 1. 11. 2022. Kapacita je <b>112/250</b>.</Paragraph>
    </Box>
    <Box boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" rounded="5px" bg="#F9F9F9" pt="2em" pb="2em" px="5em">
      <Paragraph style={{fontWeight: "bold", fontSize: "22px", marginBottom: "2em"}}>Přijímačky na střední školu? Bez obav.</Paragraph>
      <Paragraph>Připravíme Vás na CERMAT zkoušky v roce 2023.</Paragraph>
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat.</Paragraph>
      <Paragraph>Faucibus in ornare quam viverra orci sagittis eu volutpat odio. Vel facilisis volutpat est velit egestas dui id
      ornare arcu. Pulvinar etiam non quam lacus suspendisse faucibus interdum. Lorem mollis aliquam ut porttitor leo.
      Ultrices tincidunt arcu non sodales. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Commodo
        elit at imperdiet dui. Facilisi etiam dignissim diam quis. Sapien nec sagittis aliquam malesuada.</Paragraph>
      <Paragraph>Cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Cursus metus aliquam eleifend mi.</Paragraph>
    </Box>
  </Box>;
}
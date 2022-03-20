import styled from "styled-components"
import React from "react"
import ContentContainer from "../Containers/ContentContainer"
import ShadowBox from "../Containers/ShadowBox"
import { DummyApplicationCount } from "../ApplicationCount"

const Paragraph = styled.p`
  margin-bottom: 1em;
  font-weight: 500;
  line-height: 24px;
`

// TODO: Add support for narrower layouts
export default function Welcome() {
  return <ContentContainer>
    <DummyApplicationCount />
    <ShadowBox>
      <Paragraph style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "2em" }}>Přijímačky na střední školu? Bez
        obav.</Paragraph>
      <Paragraph>Připravíme Vás na CERMAT zkoušky v roce 2023.</Paragraph>
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore
        magna aliqua. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat.</Paragraph>
      <Paragraph>Faucibus in ornare quam viverra orci sagittis eu volutpat odio. Vel facilisis volutpat est velit
        egestas dui id
        ornare arcu. Pulvinar etiam non quam lacus suspendisse faucibus interdum. Lorem mollis aliquam ut porttitor leo.
        Ultrices tincidunt arcu non sodales. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.
        Commodo
        elit at imperdiet dui. Facilisi etiam dignissim diam quis. Sapien nec sagittis aliquam malesuada.</Paragraph>
      <Paragraph>Cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Cursus metus aliquam eleifend
        mi.</Paragraph>
    </ShadowBox>
  </ContentContainer>
}

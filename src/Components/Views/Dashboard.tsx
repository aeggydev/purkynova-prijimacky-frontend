import React from "react"
import ContentContainer from "../Containers/ContentContainer"
import { ChakraProps} from "@chakra-ui/react"
import { TableArea } from "../Table/TableArea"
import { InfoPanels } from "../Table/InfoPanels"
import { ButtonArea } from "../Table/ButtonArea/ButtonArea"

export function Dashboard() {
  const insideProps: ChakraProps = {
    px: "0",
    pb: "2.5em",
    mx: "0"
  }
  return <ContentContainer insideBox={insideProps}>
    <InfoPanels />
    <ButtonArea />
    <TableArea />
  </ContentContainer>
}

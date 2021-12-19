import React from "react"
import ContentContainer from "../Containers/ContentContainer"
import ShadowBox from "../Containers/ShadowBox"
import { Box, ChakraProps, Grid, GridItem } from "@chakra-ui/react"
import { Table } from "../Table/Table"

function InfoBoxRow({ left, right }: { left: string, right: string }) {
  return <Grid templateColumns="1fr 1fr" fontWeight="bold" lineHeight="30px">
    <GridItem justifySelf="start">{left}</GridItem>
    <GridItem justifySelf="end">{right}</GridItem>
  </Grid>
}

export function Dashboard() {
  const insideProps: ChakraProps = {
    px: "0",
    pb: "2.5em",
    mx: "0"
  }
  return <ContentContainer insideBox={insideProps}>
    <Box d="flex" flexDir="row" justifyContent="space-between" alignItems="start"
         px="5rem">
      <ShadowBox p=".75rem">
        <InfoBoxRow left="Maximální kapacita" right="250" />
        <InfoBoxRow left="Povolená místa pod čarou" right="10" />
        <InfoBoxRow left="Celkový počet míst" right="260" />
        <InfoBoxRow left="Přihlášení v provozu" right="Ano" />
      </ShadowBox>
      <ShadowBox p=".75rem">
        <InfoBoxRow left="Celkem přihlášek" right="16" />
        <InfoBoxRow left="Zbývající kapacita" right="234" />
        <InfoBoxRow left="Zbývající místa pod čarou" right="10" />
        <InfoBoxRow left="Přihlášek odstraněno" right="1" />
      </ShadowBox>
      <ShadowBox p=".75rem">
        <InfoBoxRow left="Platné" right="6" />
        <InfoBoxRow left="Bez e-mailu o potvrzení (zapl.)" right="2" />
        <InfoBoxRow left="Bez e-mailu o zrušení (nezapl.)" right="3" />
        <InfoBoxRow left="Čeká na uhrazení v termínu" right="4" />
        <InfoBoxRow left="Zrušené / propadnuté" right="1" />
        <InfoBoxRow left="Bez e-mailu o posunu nad čáru" right="0" />
      </ShadowBox>
    </Box>

    <Table />
  </ContentContainer>
}
import { Box, Grid, GridItem } from "@chakra-ui/react"
import React from "react"
import ShadowBox from "../Containers/ShadowBox"
import { useGetSettingsQuery } from "../../graphql/graphql"

function InfoBoxRow({ left, right }: { left: string | number, right: string | number }) {
  return <Grid templateColumns="1fr 1fr" fontWeight="bold" lineHeight="30px">
    <GridItem justifySelf="start">{left}</GridItem>
    <GridItem justifySelf="end">{right}</GridItem>
  </Grid>
}

export function InfoPanels() {
  const {error, data, loading} = useGetSettingsQuery()
  if (error) return <div>Error: {error.message}</div>
  if (loading) return <div>Loading</div>
  const settings = data!.settings

  return (
    <Box d="flex" flexDir="row" justifyContent="space-between" alignItems="start"
         px="5rem">
      <ShadowBox p=".75rem">
        <InfoBoxRow left="Maximální kapacita" right={settings.capacity} />
        <InfoBoxRow left="Povolená místa pod čarou" right={settings.allowedOver} />
        <InfoBoxRow left="Celkový počet míst" right={settings.capacity + settings.allowedOver} />
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
  )
}

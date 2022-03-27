import { Box, Grid, GridItem } from "@chakra-ui/react"
import React, { useContext } from "react"
import ShadowBox from "../Containers/ShadowBox"
import { useGetSettingsQuery, useGetStatisticsQuery } from "../../graphql/graphql"
import { ReporterContext } from "../Error/Reporter"

function InfoBoxRow({ left, right }: { left: string | number, right: string | number }) {
    return <Grid templateColumns="1fr 1fr" fontWeight="bold" lineHeight="30px">
        <GridItem justifySelf="start">{left}</GridItem>
        <GridItem justifySelf="end">{right}</GridItem>
    </Grid>
}

export function InfoPanels() {
    const reporter = useContext(ReporterContext)

    const {
        error: settingsError,
        data: settingsData,
        loading: settingsLoading
    } = useGetSettingsQuery({
        fetchPolicy: "cache-and-network",
        onError: error => reporter.error("Problém při spojení", error.message)
    })
    const {
        error: statisticsError,
        data: statisticsData,
        loading: statisticsLoading
    } = useGetStatisticsQuery({
        fetchPolicy: "cache-and-network",
        onError: error => reporter.error("Problém při spojení", error.message)
    })
    if (settingsError || statisticsError) return <div>Error: {settingsError?.message ?? statisticsError?.message}</div>
    if (settingsLoading || statisticsLoading) return <div>Loading InfoPanels</div>

    const settings = settingsData!.settings
    const statistics = statisticsData!.statistics

    return (
        <Box d="flex" flexDir="row" justifyContent="space-between" alignItems="start"
             px="5rem">
            <ShadowBox p=".75rem">
                <InfoBoxRow left="Maximální kapacita" right={settings.capacity} />
                <InfoBoxRow left="Povolená místa pod čarou" right={settings.allowedOver} />
                <InfoBoxRow left="Celkový počet míst" right={settings.capacity + settings.allowedOver} />
                <InfoBoxRow left="Přihlášení v provozu" right={settings.signUpAllowed ? "Ano" : "Ne"} />
            </ShadowBox>
            <ShadowBox p=".75rem">
                <InfoBoxRow left="Celkem přihlášek" right={statistics.totalSignups} />
                <InfoBoxRow left="Zbývající kapacita" right={statistics.remainingCapacity} />
                <InfoBoxRow left="Zbývající místa pod čarou" right={statistics.remainingCapacityOver} />
                <InfoBoxRow left="Přihlášek odstraněno" right={statistics.removedSignups} />
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

import React from "react"
import ShadowBox from "../../../Containers/ShadowBox"
import styled from "styled-components"
import { useGetSettingsQuery, useGetStatisticsQuery } from "../../../../graphql/graphql"
import { Box, Divider, SkeletonText, Text, useToast } from "@chakra-ui/react"
import { DateTime } from "luxon"
import { useIsMobile } from "../../../../hooks/useIsMobile"

const Paragraph = styled.p`
    margin-bottom: 1em;
    font-weight: 500;
    line-height: 24px;
`

export default function ApplicationCount() {
    const mobile = useIsMobile()

    const { loading: statisticsLoading, error: statisticsError, data: statisticsData } = useGetStatisticsQuery()
    const { loading: settingsLoading, error: settingsError, data: settingsData } = useGetSettingsQuery()
    const toast = useToast()
    if (statisticsError || settingsError) {
        toast({
            title: "Nastala chyba",
            status: "error",
            description: statisticsError?.message ?? settingsError?.message
        })
        return <div>Chyba při načítání informací</div>
    }
    const totalAmount = settingsLoading
        ? <SkeletonText />
        : settingsData!.settings.capacity
    const filled = statisticsLoading
        ? <SkeletonText />
        : statisticsData!.statistics.totalSignups

    const dateUntilData = settingsLoading
        ? undefined
        : DateTime.fromISO(settingsData!.settings.signUpUntil)
    const dateUntil = dateUntilData
        ? <span>{dateUntilData!.toLocaleString(DateTime.DATE_MED, { locale: "cs" })}</span>
        : <SkeletonText />
    const dateFromData = settingsLoading
        ? undefined
        : DateTime.fromISO(settingsData!.settings.signUpFrom)
    const dateFrom = dateUntilData
        ? <span>{dateFromData!.toLocaleString(DateTime.DATE_MED, { locale: "cs" })}</span>
        : <SkeletonText />

    return mobile
        ? (
            <Box textAlign="center">
                <Text my="0.5em">
                    Přihlášky přijímáme od {dateFrom}.<br />
                    Kapacita je <b>{filled}/{totalAmount}</b>
                </Text>
                <Divider borderColor="black" my="0.5em" />
            </Box>
        ) : (
            <ShadowBox py="1em">
                <Paragraph style={{ marginBottom: 0 }}>
                    Přihlášky přijímáme od {dateFrom} do {dateUntil}. Kapacita je <b>{filled}/{totalAmount}</b>.
                </Paragraph>
            </ShadowBox>
        )
}

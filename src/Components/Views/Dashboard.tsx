import React, { useEffect, useState } from "react"
import ContentContainer from "../Containers/ContentContainer"
import { ChakraProps } from "@chakra-ui/react"
import { TableArea } from "../Table/TableArea"
import { InfoPanels } from "../Table/InfoPanels"
import { ButtonArea } from "../Table/ButtonArea/ButtonArea"
import { Participant } from "../../graphql/graphql"

type updateRowPropertyStringType = (id: number, prop: keyof Participant, value: string) => void
export type changes = { [id: number]: Partial<Participant> }
type ContextType = {
    changes: changes, setChanges: React.Dispatch<React.SetStateAction<changes>>, updateRowProperty: updateRowPropertyStringType
}
export const TableContext = React.createContext<ContextType>({} as ContextType)

export function Dashboard() {
    const [changes, setChanges] = useState<changes>({})

    function updateRowProperty(id: number, prop: keyof Participant, value: string) {
        const existingData = changes[id] ?? {}
        existingData[prop] = value
        changes[id] = existingData

        setChanges(changes)
    }

    const insideProps: ChakraProps = {
        px: "0",
        pb: "2.5em",
        mx: "0"
    }
    return <TableContext.Provider value={{ changes, updateRowProperty, setChanges }}>
        <ContentContainer insideBox={insideProps}>
            <InfoPanels />
            <ButtonArea />
            <TableArea />
        </ContentContainer>
    </TableContext.Provider>
}

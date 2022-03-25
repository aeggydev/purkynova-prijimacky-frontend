import styled from "styled-components"
import { Participant, useGetParticipantsQuery } from "../../graphql/graphql"
import { TableRow } from "./TableRow"
import { TableHeader } from "./TableHeader"
import { useContext, useEffect } from "react"
import { TableContext } from "../Views/Dashboard"

export function Table() {
    const {setChanges} = useContext(TableContext)

    const { error, data, loading } = useGetParticipantsQuery({fetchPolicy: "no-cache"})
    useEffect(() => {
        setChanges({})
        console.log("done fetching!", data)
    }, [data])

    if (error) return <div>Error: {error.message}</div>
    if (loading) return <div>Loading</div>
    const participants = data!.participants as Participant[]

    return <TableRoot>
            <TableHeader />
            <tbody>{participants.map((x, i) => <TableRow participant={x} key={i} i={i} />)}</tbody>
        </TableRoot>
}

const TableRoot = styled.table`
    table-layout: fixed;
`

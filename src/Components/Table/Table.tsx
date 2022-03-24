import styled from "styled-components"
import { Participant, useGetParticipantsQuery } from "../../graphql/graphql"
import { TableRow } from "./TableRow"
import { TableHeader } from "./TableHeader"

export function Table() {
    const { error, data, loading } = useGetParticipantsQuery()
    if (error) return <div>Error: {error.message}</div>
    if (loading) return <div>Loading</div>
    const participants = data!.participants as Participant[]

    return <TableRoot>
        <TableHeader />
        <tbody>{participants.map((x, i) => <TableRow participant={x} key={i} i={i} />)}</tbody>
    </TableRoot>
}

const TableRoot = styled.table``

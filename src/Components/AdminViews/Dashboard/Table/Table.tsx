import { Participant, useGetParticipantsQuery } from "../../../../graphql/graphql"
import { TableRow } from "./TableRow"
import { TableHeader } from "./TableHeader"
import { useDispatch } from "react-redux"
import { clear } from "../../../../store/table"
import { Table as TableComponent, Tbody, useToast } from "@chakra-ui/react"

export function Table() {
    const dispatch = useDispatch()
    const toast = useToast()
    const { error, data, loading } = useGetParticipantsQuery({
        fetchPolicy: "no-cache",
        onCompleted: data => {
            console.log("done fetching!", data)
            dispatch(clear())
        },
        onError: error => toast({
            title: "Nastala chyba při načítání dat",
            status: "error",
            description: error.message
        })
    })

    if (error) return <div>Error: {error.message}</div>
    if (loading) return <div>Loading</div>
    const participants = data!.participants as Participant[]

    return <TableComponent>
        <TableHeader />
        <Tbody>{participants.map((x, i) => <TableRow participant={x} key={x.id} i={i} />)}</Tbody>
    </TableComponent>
}

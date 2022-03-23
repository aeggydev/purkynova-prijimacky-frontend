import { useAppSelector } from "../../store/hooks"
import { Box, Grid } from "@chakra-ui/react"
import { Person } from "../../Types/Person"
import React from "react"
import { colString, isOdd } from "./shared"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"
import { TableBgEven, TableBgOdd } from "../../theme"
import { Topbar } from "./Topbar"
import { gql } from "@apollo/client"
import { useParticipantsQuery } from "../../graphql/graphql"

gql`
    query Participants {
        participants {
            dueDate,
            paidDate,
            signUpDate,
            email,
            id,
            ip,
            phone,
            variableSymbol,
            parentName, parentSurname,
            participantName, participantSurname,
        }
    }
    mutation addParticipant(
        $participantSurname: String!,
        $participantName: String!,
        $parentSurname: String!,
        $parentName: String!
        $phone: String!,
        $email: String!,
        $school: String!
    ) {
        addParticipant(newParticipant: {participantSurname: $participantSurname, participantName: $participantName,
            parentSurname: $parentSurname, parentName: $parentName
            phone: $phone, email: $email, school: $school
        }) {
            id
        }
    }
    mutation updateParticipant(
        $id: Int!,
        $participantSurname: String,
        $participantName: String,
        $parentSurname: String,
        $parentName: String,
        $phone: String,
        $email: String,
        $school: String
    ) {
        updateParticipant(id: $id, updateParticipant: {participantSurname: $participantSurname, participantName: $participantName,
            parentSurname: $parentSurname, parentName: $parentName
            phone: $phone, email: $email, school: $school
        }) {
            id
        }
    }
`

export function Table() {
  const { error, data, loading } = useParticipantsQuery()
  console.log(data)

  const people = useAppSelector(({ table }) => table.people)
  const [sortKey, sortLowestToHighest] = useAppSelector(({ table }) => [table.sortKey, table.sortLowestToHighest])

  const shallowCopy = [...people]
  shallowCopy.sort((a, b) => a[sortKey]!.localeCompare(b[sortKey]!))
  if (!sortLowestToHighest) {
    shallowCopy.reverse()
  }

  return (
    <Box minW="950px">
      <Topbar />
      <Grid templateColumns={colString}>
        <TableHeader gridColumnStart={1} gridColumnEnd={12} expanded={false} bg="white" />
        {shallowCopy.map((person: Person, i: number) => <TableRow bg={isOdd(i) ? TableBgOdd : TableBgEven}
                                                                  expanded={false}
                                                                  id={person.id}
                                                                  key={i} />)}
      </Grid>
    </Box>
  )
}

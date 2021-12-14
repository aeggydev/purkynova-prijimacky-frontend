import { useAppSelector } from "../../store/hooks"
import { Box } from "@chakra-ui/react"
import { Person } from "../../Types/Person"
import React from "react"
import { colString, isOdd } from "./shared"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"
import { TableBgEven, TableBgOdd } from "../../theme"

export function Table() {
  const people = useAppSelector(({ table }) => table.people)
  const [sortKey, sortLowestToHighest] = useAppSelector(({ table }) => [table.sortKey, table.sortLowestToHighest])

  const shallowCopy = [...people]
  shallowCopy.sort((a, b) => a[sortKey]!.localeCompare(b[sortKey]!))
  if (!sortLowestToHighest) {
    shallowCopy.reverse()
  }

  return <Box display="grid" gridTemplateColumns={colString} minW="950px">
    <TableHeader gridColumnStart={1} gridColumnEnd={12} expanded={false} bg="white" />
    {shallowCopy.map((person: Person, i: number) => <TableRow person={person} bg={isOdd(i) ? TableBgOdd : TableBgEven}
                                                              expanded={false}
                                                              key={i} />)}
  </Box>
}
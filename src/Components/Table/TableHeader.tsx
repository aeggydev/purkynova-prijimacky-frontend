import { Box, ChakraProps, GridItem, GridItemProps } from "@chakra-ui/react"
import { useAppSelector } from "../../store/hooks"
import { useDispatch } from "react-redux"
import { Person } from "../../Types/Person"
import React, { PropsWithChildren } from "react"
import { flipLowestToHighest, setKey, setSortLowestToHighest } from "../../store/table"
import CloseTable from "../../Icons/CloseTable"
import { HorizontalSplit, VerticalSplit } from "./LayoutComponents"
import { TableBgOdd } from "../../theme"

export interface TableHeaderProps extends ChakraProps {
  expanded: boolean;
  bg: string;
}

export function TableHeader(props: TableHeaderProps) {
  const [sortKey, sortLowestToHighest] = useAppSelector(({ table }) => [table.sortKey, table.sortLowestToHighest])
  const dispatch = useDispatch()

  const CellSimple = ({ header, flex = 0 }: { header: string, flex?: number }) => (
    <Box flexGrow={1}>
      {header}
    </Box>
  )

  interface HeaderCellProps extends GridItemProps {
    col?: number;
    noDecor?: boolean;
    dbKey?: keyof Person
  }

  const HeaderCell = (props: PropsWithChildren<HeaderCellProps>) => {
    function handleKey() {
      if (!props.dbKey) return

      const isCurrent = props.dbKey === sortKey

      if (!isCurrent) {
        dispatch(setKey(props.dbKey))
        dispatch(setSortLowestToHighest(true))
      } else {
        dispatch(flipLowestToHighest())
      }
    }

    const sortSign = !(props.dbKey === sortKey)
      ? null
      : sortLowestToHighest ? "▲" : "▼"

    return <GridItem display="grid" justifyContent="center" alignContent="center"
                     bg={props.noDecor ? "transparent" : TableBgOdd}
                     boxShadow={props.noDecor ? undefined : "inset 0 0 2px #000000"}
                     fontSize="12px" lineHeight="18px"
                     onClick={props.dbKey ? handleKey : undefined}
                     textTransform="uppercase" fontWeight="bold"
                     userSelect="none"
                     colStart={props.col ? props.col : undefined}
                     {...props}>{props.children} {sortSign}</GridItem>
  }

  return props.expanded
    ? <Box display="flex">
      <CellSimple header="jméno účastníka" />
      <CellSimple header="příjmení účastníka" />
      <CellSimple header="základní škola" />
      <CellSimple header="jméno zákon. zást." />
      <CellSimple header="příjmení zákon. zást." />
    </Box>
    : <>
      <HeaderCell col={1} dbKey="id">
        ID
        {/*<Filter color="black" />*/}
      </HeaderCell>
      <VerticalSplit gridColumn={2}>
        <HorizontalSplit cols="1fr 1fr">
          <HeaderCell dbKey="applicantName">jméno účast.</HeaderCell>
          <HeaderCell dbKey="applicantSurname">příjm. účast.</HeaderCell>
        </HorizontalSplit>
        <HorizontalSplit cols="1fr 1fr">
          <HeaderCell dbKey="parentName">jméno zák. zást.</HeaderCell>
          <HeaderCell dbKey="parentSurname">příjm. zák. zást.</HeaderCell>
        </HorizontalSplit>
      </VerticalSplit>
      <VerticalSplit gridColumn={3}>
        <HeaderCell flexGrow={1} dbKey="schoolName">základní škola</HeaderCell>
        <HorizontalSplit cols="4fr 7fr 4fr" flexGrow={1}>
          <HeaderCell dbKey="phone">telefon</HeaderCell>
          <HeaderCell dbKey="parentEmail">e-mail zák. zástupce</HeaderCell>
          <HeaderCell dbKey="ip">ip adresa</HeaderCell>
        </HorizontalSplit>
      </VerticalSplit>
      <HeaderCell col={4} dbKey="variableSymbol">
        variabilní symbol
      </HeaderCell>
      <HeaderCell col={5} dbKey="signInDate">
        datum přihlášení
      </HeaderCell>
      <HeaderCell col={6} dbKey="payTillDate">
        datum splatnosti
      </HeaderCell>
      <HeaderCell col={7} dbKey="paidDate">
        datum úhrady
      </HeaderCell>
      <HeaderCell col={8} noDecor />
      <HeaderCell col={9} noDecor>
        <CloseTable color="black" />
      </HeaderCell>
    </>
}
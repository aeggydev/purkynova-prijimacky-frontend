import { Box, Button, ChakraProps, Grid, GridItem, GridItemProps, Input } from "@chakra-ui/react"
import { DateTime } from "luxon"
import React, { MutableRefObject, PropsWithChildren, useLayoutEffect, useRef, useState } from "react"
import { Person } from "../Types/Person"
import CloseTable from "../Icons/CloseTable"
import Filter from "../Icons/Filter"
import Settings from "../Icons/Settings"
import Email from "../Icons/Email"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../store/hooks"
import { flipLowestToHighest, setKey, setSortLowestToHighest } from "../store/table"


// TODO: Add scrolling instead of collapsing table

const bgOdd = "#EAEAEA"
const bgEven = "#E0E0E0"
const isOdd = (i: number): boolean => i % 2 == 0

const VerticalSplit = (props: PropsWithChildren<ChakraProps>) => (
  <Grid display="flex" flexDirection="column" {...props}>
    {props.children}
  </Grid>
)

interface HorizontalSplitProps extends ChakraProps {
  cols: string;
}

const HorizontalSplit = (props: PropsWithChildren<HorizontalSplitProps>) => (
  <Box display="grid" gridAutoFlow="column" gridTemplateColumns={props.cols}
       {...props}>
    {props.children}
  </Box>
)

const colString = "1fr 6.5fr 15fr 2fr 3.5fr 2.5fr 2.5fr 1.5fr 1.5fr"

interface TableHeaderProps extends ChakraProps {
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
                     bg={props.noDecor ? "transparent" : bgOdd}
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

export function Table() {
  const people = useAppSelector(({ table }) => table.people)
  const [sortKey, sortLowestToHighest] = useAppSelector(({table}) => [table.sortKey, table.sortLowestToHighest])
  const shallowCopy = [...people]
  shallowCopy.sort((a, b ) => a[sortKey]!.localeCompare(b[sortKey]!))
  if (!sortLowestToHighest) {
    shallowCopy.reverse()
  }

  const dispatch = useDispatch()

  return <Box display="grid" gridTemplateColumns={colString} minW="950px">
    <TableHeader gridColumnStart={1} gridColumnEnd={12} expanded={false} bg="white" />
    {shallowCopy.map((person: Person, i: number) => <TableRow person={person} bg={isOdd(i) ? bgOdd : bgEven} expanded={false}
                                                         key={i} />)}
  </Box>
}

export function TableRow(props: { person: Person, bg: string, expanded: boolean }) {
  const signInDate = DateTime.fromISO(props.person.signInDate).toFormat("dd. MM. yyyy hh:mm")
  const payTillDate = DateTime.fromISO(props.person.payTillDate).toFormat("dd. MM. yyyy")
  const paidDate = props.person.paidDate
    ? DateTime.fromISO(props.person.paidDate).toFormat("dd. MM. yyyy")
    : "...nothing"

  const [splitHeight, setSplitHeight] = useState("100%")
  const splitExampleRef = useRef<HTMLInputElement>(null)
  // TODO: Fix this horrible hack
  function refreshSplitHeight() {
    if (!splitExampleRef.current) return
    const computedStyle = window.getComputedStyle(splitExampleRef.current)
    setSplitHeight(computedStyle.height)
  }
  useLayoutEffect(refreshSplitHeight)

  const CellBg = props.bg

  interface CellProps extends GridItemProps {
    bold?: boolean;
    gray?: boolean;
    small?: boolean;
    input?: boolean; // TODO: Change to its own element
    inputStr?: string
    ref?: MutableRefObject<any>
  }

  const Cell = (props: PropsWithChildren<CellProps>) => {
    const normal = "inherit"
    const gray = "gray"

    const inside = props.input
      ? <Input value={props.inputStr} type="text"
               p="0" m="0" pl="1ex"
               color="inherit" bg="inherit"
               w="100%" h="100%"
               display="inline-grid" justifyContent="center" alignItems="center"
               fontWeight="inherit" fontSize="inherit" fontFamily="inherit"
               ref={splitExampleRef} // TODO: Why does this even work?
               borderRadius="0" border="none" />
      : props.children

    const justifyAlign = props.input ? "stretch" : "center"

    return <GridItem fontSize={props.small ? "11px" : "13px"}
                     display="grid" justifyContent={justifyAlign} alignContent={justifyAlign}
                     fontWeight={props.bold ? "bold" : "normal"}
                     flexGrow={1}
                     bg={CellBg}
                     color={props.gray ? gray : normal}
                     {...props}>
      {inside}
    </GridItem>
  }

  return <>
    <Cell colStart={1} bold fontSize="14px">
      {props.person.personalId}
    </Cell>
    <VerticalSplit gridColumn={2} h="100%">
      <HorizontalSplit cols="1fr 1fr">
        <Cell bold h={splitHeight} input inputStr={props.person.applicantName}>{props.person.applicantName}</Cell>
        <Cell bold input inputStr={props.person.applicantSurname}>{props.person.applicantSurname}</Cell>
      </HorizontalSplit>
      <HorizontalSplit cols="1fr 1fr">
        <Cell input inputStr={props.person.parentName}>{props.person.parentName}</Cell>
        <Cell input inputStr={props.person.parentSurname}>{props.person.parentSurname}</Cell>
      </HorizontalSplit>
    </VerticalSplit>
    <VerticalSplit gridColumn={3}>
      <Cell bold gray input inputStr={props.person.schoolName}>{props.person.schoolName}</Cell>
      <HorizontalSplit cols="4fr 7fr 4fr">
        <Cell bold input inputStr={props.person.phone}>{props.person.phone}</Cell>
        <Cell bold input inputStr={props.person.parentEmail}
              ref={splitExampleRef}>
          {props.person.parentEmail}
        </Cell>
        <Cell bold gray>{props.person.ip}</Cell>
      </HorizontalSplit>
    </VerticalSplit>
    <Cell colStart={4} bold>
      {props.person.variableSymbol}
    </Cell>
    <Cell colStart={5} bold gray small>
      {signInDate}
    </Cell>
    <Cell colStart={6} bold small>
      {payTillDate}
    </Cell>
    <Cell colStart={7} bold small>
      {paidDate}
    </Cell>
    <Cell colStart={8} bold overflow="hidden">
      <Button bg="rgb(185, 28, 28)" rounded="0.25rem" h="100%" w="100%"
              display="flex" justifyContent="center" alignItems="center"
              p="3px">
        <Email color="white" />
      </Button>
    </Cell>
    <Cell colStart={9} overflow="hidden">
      <Button h="100%" w="100%" bg="transparent" _focus={{ border: "none" }}>
        <Settings color="black" />
      </Button>
    </Cell>
    {/*
    <Cell colStart={2} colEnd={12} fontStyle="italic">Platba přijde o den později</Cell>
*/}
  </>
}

// @ts-ignore
import Settings from "url:/src/Icons/settings.svg";
// @ts-ignore
import Mail from "url:/src/Icons/email.svg";
import { Box, Button, Center, ChakraProps, Grid, GridItem, GridItemProps, GridProps } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { PropsWithChildren } from "react";
import { Person } from "../Types/Person";

// TODO: Table guide
// TODO: Use react-table

const colString = "1fr 4fr 4fr 7fr 4fr 2.5fr 2.5fr 2fr 2fr 1fr 1fr"

export function TableHeader({ expanded, bg }: { expanded: boolean, bg: string }) {
  const CellSimple = ({ header, flex = 0 }: { header: string, flex?: number }) => (
    <Box flexGrow={1} border="solid 1px black">
      {header}
    </Box>
  )

  interface CellProps extends GridItemProps {
  }
  const Cell = (props: PropsWithChildren<CellProps>) => (
    <GridItem display="grid" justifyContent="center" alignContent="center"
              border="solid 1px black" fontSize="13px" lineHeight="13px"
              textTransform="uppercase" fontWeight="bold"
              {...props}>{props.children}</GridItem>
  )

  return expanded
    ? <Box display="flex">
      <CellSimple header="jméno účastníka" />
      <CellSimple header="příjmení účastníka" />
      <CellSimple header="základní škola" />
      <CellSimple header="jméno zákon. zást." />
      <CellSimple header="příjmení zákon. zást." />
    </Box>
    : <Grid bg={bg} templateColumns={colString}
            templateRows="repeat(2, 1fr)">
      <Cell rowSpan={2} colStart={1}>ID</Cell>
      <Cell colStart={2}>jméno, příjmení účastn.</Cell>
      <Cell colStart={2}>jméno, příjmení zák. zást.</Cell>
      <Cell rowStart={1} colStart={3} colSpan={3}>základní škola</Cell>
      <Cell rowStart={2} colStart={3}>telefon</Cell>
      <Cell rowStart={2} colStart={4}>
        e-mail zák. zástupce
      </Cell>
      <Cell rowStart={2} colStart={5}>ip adresa</Cell>
      <Cell rowStart={1} rowSpan={2} colStart={6}>
        variabilní symbol
      </Cell>
      <Cell rowStart={1} rowSpan={2} colStart={7}>
        datum přihlášení
      </Cell>
      <Cell rowStart={1} rowSpan={2} colStart={8}>
        datum splatnosti
      </Cell>
      <Cell rowStart={1} rowSpan={2} colStart={9}>
        datum úhrady
      </Cell>
      <Cell rowStart={1} rowSpan={2} colStart={10} />
      <Cell rowStart={1} rowSpan={2} colStart={11}>
        EXP
      </Cell>
    </Grid>
}

export function Table({ people }: { people: Person[] }) {
  return <Box>
    <TableHeader expanded={false} bg="white" />
    {people.map(person => <TableRow person={person} bg="white" expanded={false} />)}
  </Box>
}

export function TableRow(props: { person: Person, bg: string, expanded: boolean }) {
  const signInDate = DateTime.fromISO(props.person.signInDate).toFormat("dd. MM. yyyy hh:mm")
  const payTillDate = DateTime.fromISO(props.person.payTillDate).toFormat("dd. MM. yyyy")
  const paidDate = props.person.paidDate
    ? DateTime.fromISO(props.person.paidDate).toFormat("dd. MM. yyyy")
    : "...nothing"

  interface CellProps extends GridItemProps {
    bold?: boolean
  }
  const Cell = (props: PropsWithChildren<CellProps>) => (
    <GridItem border="solid 1px black" fontSize="13px"
              display="grid" justifyContent="center" alignContent="center"
              fontWeight={props.bold ? "bold" : "normal"}
              {...props}>
      {props.children}
    </GridItem>
  )

  return <Grid bg={props.bg} templateColumns={colString}
               templateRows="repeat(3, 1fr)">
    <Cell rowSpan={2} colStart={1} bold fontSize="14px">
      {props.person.personalId}
    </Cell>
    <Cell colStart={2} bold>{props.person.applicantName} {props.person.applicantSurname}</Cell>
    <Cell colStart={2}>{props.person.parentName} {props.person.parentSurname}</Cell>
    <Cell rowStart={1} colStart={3} colSpan={3} bold color="gray">{props.person.schoolName}</Cell>
    <Cell rowStart={2} colStart={3} bold>{props.person.phone}</Cell>
    <Cell rowStart={2} colStart={4} bold>
      {props.person.parentEmail}
    </Cell>
    <Cell rowStart={2} colStart={5} bold color="gray">{props.person.ip}</Cell>
    <Cell rowStart={1} rowSpan={2} colStart={6} bold>
      {props.person.variableSymbol}
    </Cell>
    <Cell rowStart={1} rowSpan={2} colStart={7} bold color="gray">
      {signInDate}
    </Cell>
    <Cell rowStart={1} rowSpan={2} colStart={8} bold>
      {payTillDate}
    </Cell>
    <Cell rowStart={1} rowSpan={2} colStart={9} bold>
      {paidDate}
    </Cell>
    <Cell rowStart={1} rowSpan={2} colStart={10} bold overflow="hidden">
      <Button bg="rgb(185, 28, 28)" rounded="0.25rem" h="60%" w="100%" display="flex" justifyContent="center"
              alignItems="center">
        <img src={Mail} alt="Mail icon" />
      </Button>
    </Cell>
    <Cell rowStart={1} rowSpan={2} colStart={11} overflow="hidden">
      <Button h="60%" w="100%" bg="transparent">
        <img src={Settings} alt="Settings icon" /> {/* TODO: Fix color */}
      </Button>
    </Cell>
    <Cell colStart={2} colEnd={12} fontStyle="italic">Platba přijde o den později</Cell>
  </Grid>;
}

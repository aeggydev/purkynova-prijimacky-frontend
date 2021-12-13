// @ts-ignore
import Settings from "url:/src/Icons/settings.svg";
// @ts-ignore
import Mail from "url:/src/Icons/email.svg";
import { Box, Button, ChakraProps, Grid, GridItem, GridItemProps } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { PropsWithChildren } from "react";
import { Person } from "../Types/Person";

// TODO: Add scrolling instead of collapsing table

const bgOdd = "#EAEAEA"
const bgEven = "#E0E0E0"
const isOdd = (i: number): boolean => i % 2 == 0

const VerticalSplit = (props: PropsWithChildren<ChakraProps>) => (
  <Grid display="flex" flexDirection="column" {...props}>
    {props.children}
  </Grid>
);

interface HorizontalSplitProps extends ChakraProps {
  cols: string;
}

const HorizontalSplit = (props: PropsWithChildren<HorizontalSplitProps>) => (
  <Box display="grid" gridAutoFlow="column" gridTemplateColumns={props.cols} {...props}>
    {props.children}
  </Box>
);

const colString = "1fr 6.5fr 15fr 2.5fr 3fr 2.5fr 2.5fr 1.5fr 1.5fr";

interface TableHeaderProps extends ChakraProps {
  expanded: boolean
  bg: string
}
export function TableHeader(props: TableHeaderProps) {
  const CellSimple = ({ header, flex = 0 }: { header: string, flex?: number }) => (
    <Box flexGrow={1}>
      {header}
    </Box>
  );

  interface CellProps extends GridItemProps {
    col?: number
  }

  const Cell = (props: PropsWithChildren<CellProps>) => (
    <GridItem display="grid" justifyContent="center" alignContent="center"
              fontSize="12px" lineHeight="18px" bg={bgOdd}
              boxShadow="inset 0 0 2px #000000"
              textTransform="uppercase" fontWeight="bold"
              colStart={props.col ? props.col : undefined}
              {...props}>{props.children}</GridItem>
  );

  return props.expanded
    ? <Box display="flex">
      <CellSimple header="jméno účastníka" />
      <CellSimple header="příjmení účastníka" />
      <CellSimple header="základní škola" />
      <CellSimple header="jméno zákon. zást." />
      <CellSimple header="příjmení zákon. zást." />
    </Box>
    : <>
      <Cell col={1}>ID</Cell>
      <VerticalSplit gridColumn={2}>
        <Cell>jméno, příjmení účastn.</Cell>
        <Cell>jméno, příjmení zák. zást.</Cell>
      </VerticalSplit>
      <VerticalSplit gridColumn={3}>
        <Cell flexGrow={1}>základní škola</Cell>
        <HorizontalSplit cols="4fr 7fr 4fr" flexGrow={1}>
          <Cell>telefon</Cell>
          <Cell>e-mail zák. zástupce</Cell>
          <Cell>ip adresa</Cell>
        </HorizontalSplit>
      </VerticalSplit>
      <Cell col={4}>
        variabilní symbol
      </Cell>
      <Cell col={5}>
        datum přihlášení
      </Cell>
      <Cell col={6}>
        datum splatnosti
      </Cell>
      <Cell col={7}>
        datum úhrady
      </Cell>
      <Cell col={8} />
      <Cell col={9}>
        EXP
      </Cell>
    </>;
}

export function Table({ people }: { people: Person[] }) {
  return <Box display="grid" gridTemplateColumns={colString}>
    <TableHeader gridColumnStart={1} gridColumnEnd={12} expanded={false} bg="white" />
    {people.map((person, i) => <TableRow person={person} bg={isOdd(i) ? bgOdd : bgEven} expanded={false} key={i} />)}
  </Box>;
}

export function TableRow(props: { person: Person, bg: string, expanded: boolean }) {
  const signInDate = DateTime.fromISO(props.person.signInDate).toFormat("dd. MM. yyyy hh:mm");
  const payTillDate = DateTime.fromISO(props.person.payTillDate).toFormat("dd. MM. yyyy");
  const paidDate = props.person.paidDate
    ? DateTime.fromISO(props.person.paidDate).toFormat("dd. MM. yyyy")
    : "...nothing";

  const CellBg = props.bg

  interface CellProps extends GridItemProps {
    bold?: boolean;
    gray?: boolean;
    small?: boolean;
  }

  const Cell = (props: PropsWithChildren<CellProps>) => {
    const normal = "inherit"
    const gray = "gray"

    return <GridItem fontSize={props.small ? "11px" : "13px"}
                     display="grid" justifyContent="center" alignContent="center"
                     fontWeight={props.bold ? "bold" : "normal"}
                     bg={CellBg}
                     color={props.gray ? gray : normal}
                     {...props}>
      {props.children}
    </GridItem>;
  };

  return <>
    <Cell colStart={1} bold fontSize="14px">
      {props.person.personalId}
    </Cell>
    <VerticalSplit gridColumn={2}>
      <Cell bold>{props.person.applicantName} {props.person.applicantSurname}</Cell>
      <Cell>{props.person.parentName} {props.person.parentSurname}</Cell>
    </VerticalSplit>
    <VerticalSplit gridColumn={3}>
      <Cell bold gray>{props.person.schoolName}</Cell>
      <HorizontalSplit cols="4fr 7fr 4fr">
        <Cell bold>{props.person.phone}</Cell>
        <Cell bold>
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
      <Button bg="rgb(185, 28, 28)" rounded="0.25rem" h="60%" w="100%" display="flex" justifyContent="center"
              alignItems="center">
        <img src={Mail} alt="Mail icon" />
      </Button>
    </Cell>
    <Cell colStart={9} overflow="hidden">
      <Button h="60%" w="100%" bg="transparent">
        <img src={Settings} alt="Settings icon" /> {/* TODO: Fix color */}
      </Button>
    </Cell>
{/*
    <Cell colStart={2} colEnd={12} fontStyle="italic">Platba přijde o den později</Cell>
*/}
  </>;
}

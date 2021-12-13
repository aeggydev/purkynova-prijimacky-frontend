// @ts-ignore
import Settings from "url:/src/Icons/settings.svg";
// @ts-ignore
import Mail from "url:/src/Icons/email.svg";
import { Box, Button, ChakraProps, Grid, GridItem, GridItemProps } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { PropsWithChildren } from "react";
import { Person } from "../Types/Person";

// TODO: Table guide
// TODO: Use react-table

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

const colString = "1fr 4fr 4fr 7fr 4fr 2.5fr 2.5fr 2fr 2fr 1fr 1fr";

export function TableHeader({ expanded, bg }: { expanded: boolean, bg: string }) {
  const CellSimple = ({ header, flex = 0 }: { header: string, flex?: number }) => (
    <Box flexGrow={1} border="solid 1px black">
      {header}
    </Box>
  );

  interface CellProps extends GridItemProps {
  }

  const Cell = (props: PropsWithChildren<CellProps>) => (
    <GridItem display="grid" justifyContent="center" alignContent="center"
              border="solid 1px black" fontSize="13px" lineHeight="13px"
              textTransform="uppercase" fontWeight="bold"
              {...props}>{props.children}</GridItem>
  );

  return expanded
    ? <Box display="flex">
      <CellSimple header="jméno účastníka" />
      <CellSimple header="příjmení účastníka" />
      <CellSimple header="základní škola" />
      <CellSimple header="jméno zákon. zást." />
      <CellSimple header="příjmení zákon. zást." />
    </Box>
    : <Grid bg={bg} templateColumns={colString}>
      <Cell colStart={1}>ID</Cell>
      <VerticalSplit gridColumnStart={2}>
        <Cell>jméno, příjmení účastn.</Cell>
        <Cell>jméno, příjmení zák. zást.</Cell>
      </VerticalSplit>
      <VerticalSplit gridColumnStart={3} gridColumnEnd={6}>
        <Cell flexGrow={1}>základní škola</Cell>
        <HorizontalSplit cols="4fr 7fr 4fr" flexGrow={1}>
          <Cell>telefon</Cell>
          <Cell>e-mail zák. zástupce</Cell>
          <Cell>ip adresa</Cell>
        </HorizontalSplit>
      </VerticalSplit>
      <Cell colStart={6}>
        variabilní symbol
      </Cell>
      <Cell colStart={7}>
        datum přihlášení
      </Cell>
      <Cell colStart={8}>
        datum splatnosti
      </Cell>
      <Cell colStart={9}>
        datum úhrady
      </Cell>
      <Cell colStart={10} />
      <Cell colStart={11}>
        EXP
      </Cell>
    </Grid>
}

export function Table({ people }: { people: Person[] }) {
  return <Box>
    <TableHeader expanded={false} bg="white" />
    {people.map(person => <TableRow person={person} bg="white" expanded={false} />)}
  </Box>;
}

export function TableRow(props: { person: Person, bg: string, expanded: boolean }) {
  const signInDate = DateTime.fromISO(props.person.signInDate).toFormat("dd. MM. yyyy hh:mm");
  const payTillDate = DateTime.fromISO(props.person.payTillDate).toFormat("dd. MM. yyyy");
  const paidDate = props.person.paidDate
    ? DateTime.fromISO(props.person.paidDate).toFormat("dd. MM. yyyy")
    : "...nothing";

  interface CellProps extends GridItemProps {
    bold?: boolean;
  }

  const Cell = (props: PropsWithChildren<CellProps>) => (
    <GridItem border="solid 1px black" fontSize="13px"
              display="grid" justifyContent="center" alignContent="center"
              fontWeight={props.bold ? "bold" : "normal"}
              {...props}>
      {props.children}
    </GridItem>
  );

  return <Grid bg={props.bg} templateColumns={colString}>
    <Cell rowSpan={2} colStart={1} bold fontSize="14px">
      {props.person.personalId}
    </Cell>
    <VerticalSplit gridColumn={2}>
      <Cell bold>{props.person.applicantName} {props.person.applicantSurname}</Cell>
      <Cell>{props.person.parentName} {props.person.parentSurname}</Cell>
    </VerticalSplit>
    <VerticalSplit gridColumnStart={3} gridColumnEnd={6}>
      <Cell bold color="gray">{props.person.schoolName}</Cell>
      <HorizontalSplit cols="4fr 7fr 4fr">
        <Cell bold>{props.person.phone}</Cell>
        <Cell bold>
          {props.person.parentEmail}
        </Cell>
        <Cell bold color="gray">{props.person.ip}</Cell>
      </HorizontalSplit>
    </VerticalSplit>
    <Cell colStart={6} bold>
      {props.person.variableSymbol}
    </Cell>
    <Cell colStart={7} bold color="gray">
      {signInDate}
    </Cell>
    <Cell colStart={8} bold>
      {payTillDate}
    </Cell>
    <Cell colStart={9} bold>
      {paidDate}
    </Cell>
    <Cell colStart={10} bold overflow="hidden">
      <Button bg="rgb(185, 28, 28)" rounded="0.25rem" h="60%" w="100%" display="flex" justifyContent="center"
              alignItems="center">
        <img src={Mail} alt="Mail icon" />
      </Button>
    </Cell>
    <Cell colStart={11} overflow="hidden">
      <Button h="60%" w="100%" bg="transparent">
        <img src={Settings} alt="Settings icon" /> {/* TODO: Fix color */}
      </Button>
    </Cell>
    <Cell colStart={2} colEnd={12} fontStyle="italic">Platba přijde o den později</Cell>
  </Grid>;
}

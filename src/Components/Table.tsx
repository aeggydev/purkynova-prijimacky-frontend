// @ts-ignore
import Settings from "url:/src/Icons/settings.svg";
// @ts-ignore
import Mail from "url:/src/Icons/email.svg";
import { Box, Button, Center, ChakraProps, Grid, GridItem, GridProps } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { Person } from "../Types/Person";

// TODO: Table guide
// TODO: Use react-table

export function TableHeader({ expanded, bg }: { expanded: boolean, bg: string }) {
  const CellSimple = ({ header, flex = 0 }: { header: string, flex?: number }) => (
    <Box flexGrow={1} border="solid 1px black">
      {header}
    </Box>
  )

  return expanded
    ? <Box display="flex">
      <CellSimple header="jméno účastníka" />
      <CellSimple header="příjmení účastníka" />
      <CellSimple header="základní škola" />
      <CellSimple header="jméno zákon. zást." />
      <CellSimple header="příjmení zákon. zást." />
    </Box>
    : <Grid bg={bg} templateColumns="1fr 4fr 3fr 4fr 4fr 2fr 2.5fr 2fr 2fr 1fr 1fr"
            templateRows="repeat(2, 1fr)">
      <GridItem fontWeight="bold" pr="1px" rowSpan={2} colStart={1} fontSize="2xl">ID</GridItem>
      <GridItem colStart={2} fontWeight="bold">jméno, příjmení účastn.</GridItem>
      <GridItem colStart={2}>jméno, příjmení zák. zást.</GridItem>
      <GridItem rowStart={1} colStart={3} colSpan={3} fontWeight="bold" color="gray">základní škola</GridItem>
      <GridItem rowStart={2} colStart={3} fontWeight="bold">telefon</GridItem>
      <GridItem rowStart={2} colStart={4} fontWeight="bold" fontSize="sm" display="flex" justifyContent="start"
                alignItems="center">
        e-mail zák. zástupce
      </GridItem>
      <GridItem rowStart={2} colStart={5} fontWeight="bold" color="gray">ip adresa</GridItem>
      <GridItem rowStart={1} rowSpan={2} colStart={6} display="flex" justifyContent="center" alignItems="center"
                fontWeight="bold" fontSize="2xl">
        variabilní symbol
      </GridItem>
      <GridItem rowStart={1} rowSpan={2} colStart={7} fontSize="sm" display="flex" justifyContent="center"
                alignItems="center" fontWeight="bold" color="gray">
        datum přihlášení
      </GridItem>
      <GridItem rowStart={1} rowSpan={2} colStart={8} fontWeight="bold" display="flex" justifyContent="center"
                alignItems="center">
        datum splatnosti
      </GridItem>
      <GridItem rowStart={1} rowSpan={2} colStart={9} fontWeight="bold" display="flex" justifyContent="center"
                alignItems="center">
        datum úhrady
      </GridItem>
{/*
      <GridItem rowStart={1} rowSpan={2} colStart={10} display="flex" justifyContent="center" alignItems="center">
        <Button bg="rgb(185, 28, 28)" rounded="0.25rem" h="60%" w="100%" display="flex" justifyContent="center"
                alignItems="center">
          <img src={Mail} alt="Mail icon" />
        </Button>
      </GridItem>
*/}
      <GridItem rowStart={1} rowSpan={2} colStart={11} display="flex" justifyContent="center" alignItems="center">
        EXP
      </GridItem>
    </Grid>
}

export function Table({ people }: { people: Person[] }) {
  return <Box>
    <TableHeader expanded={false} bg="white" />
    {people.map(person => <TableRow person={person} bg="white" expanded={false} />)}
  </Box>
}

export function TableRow(props: { person: Person, bg: string, expanded: boolean }) {
  const signInDate = DateTime.fromISO(props.person.signInDate).toFormat("dd. MM. yyyy hh:mm");
  const payTillDate = DateTime.fromISO(props.person.payTillDate).toFormat("dd. MM. yyyy");
  const paidDate = props.person.paidDate
    ? DateTime.fromISO(props.person.paidDate).toFormat("dd. MM. yyyy")
    : "...nothing";

  return <Grid bg={props.bg} templateColumns="1fr 4fr 3fr 4fr 4fr 2fr 2.5fr 2fr 2fr 1fr 1fr"
               templateRows="repeat(3, 1fr)">
    <GridItem fontWeight="bold" pr="1px" rowSpan={2} colStart={1} fontSize="2xl">
      <Center>{props.person.personalId}</Center>
    </GridItem>
    <GridItem colStart={2} fontWeight="bold">{props.person.applicantName} {props.person.applicantSurname}</GridItem>
    <GridItem colStart={2}>{props.person.parentName} {props.person.parentSurname}</GridItem>
    <GridItem rowStart={1} colStart={3} colSpan={3} fontWeight="bold" color="gray">{props.person.schoolName}</GridItem>
    <GridItem rowStart={2} colStart={3} fontWeight="bold">{props.person.phone}</GridItem>
    <GridItem rowStart={2} colStart={4} fontWeight="bold" fontSize="sm" display="flex" justifyContent="start"
              alignItems="center">
      {props.person.parentEmail}
    </GridItem>
    <GridItem rowStart={2} colStart={5} fontWeight="bold" color="gray">{props.person.ip}</GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={6} display="flex" justifyContent="center" alignItems="center"
              fontWeight="bold" fontSize="2xl">
      {props.person.variableSymbol}
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={7} fontSize="sm" display="flex" justifyContent="center"
              alignItems="center" fontWeight="bold" color="gray">
      {signInDate}
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={8} fontWeight="bold" display="flex" justifyContent="center"
              alignItems="center">
      {payTillDate}
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={9} fontWeight="bold" display="flex" justifyContent="center"
              alignItems="center">
      {paidDate}
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={10} display="flex" justifyContent="center" alignItems="center">
      <Button bg="rgb(185, 28, 28)" rounded="0.25rem" h="60%" w="100%" display="flex" justifyContent="center"
              alignItems="center">
        <img src={Mail} alt="Mail icon" />
      </Button>
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={11} display="flex" justifyContent="center" alignItems="center">
      <Button h="60%" w="100%" bg="transparent">
        <img src={Settings} alt="Settings icon" />
      </Button>
    </GridItem>
    <GridItem colStart={2} colEnd={12} fontStyle="italic">Platba přijde o den později</GridItem>
  </Grid>;
}

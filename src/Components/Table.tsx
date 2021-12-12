// @ts-ignore
import Settings from "url:/src/Icons/settings.svg";
// @ts-ignore
import Mail from "url:/src/Icons/email.svg";
import { Button, Center, Grid, GridItem } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { Person } from "../Types/Person";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// TODO: Table guide
// TODO: Use react-table

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "applicantName", headerName: "Jméno", flex: 1 },
  { field: "applicantSurname", headerName: "Příjmení", flex: 1 },
  { field: "parentName", headerName: "Jméno rodiče", flex: 1 },
  { field: "parentSurname", headerName: "Příjmení rodiče", flex: 1 },
  { field: "phone", headerName: "Telefon", flex: 1 },
  { field: "variableSymbol", headerName: "Variabilní symbol", flex: 1 },
  { field: "schoolName", headerName: "Jméno školy", flex: 1 }
];

export function Table(props: { people: Person[] }) {
  console.log(props.people);
  return <div style={{ background: "white", height: "100%", width: "100%", display: "flex" }}>
    <DataGrid autoHeight columns={columns} rows={props.people} />
    {/*{props.people.map((x, i) => <TableRow person={x} key={i} bg="#eee" />)}*/}
  </div>;
}

export function TableRow(props: { person: Person, bg: string }) {
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

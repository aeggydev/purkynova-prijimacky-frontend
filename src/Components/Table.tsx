// @ts-ignore
import Settings from "url:/src/Icons/settings.svg";
// @ts-ignore
import Mail from "url:/src/Icons/email.svg";
import { Button, Center, Grid, GridItem } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { Person } from "../Types/Person";
import { useTable } from "react-table";

// TODO: Table guide
// TODO: Use react-table

export function Table(props: { people: Person[] }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Info",
        columns: [
          {
            Header: "Jméno účastníka",
            accessor: "applicantName"
          },
          {
            Header: "Přijmení účastníka",
            accessor: "applicatSurname"
          },
          {
            Header: "Základní škola",
            accessor: "schoolName"
          },
          {
            Header: "Jméno zákon. zást.",
            accessor: "parentName"
          },
          {
            Header: "Příjmení zákon. zást.",
            accessor: "parentSurname"
          },
          {
            Header: "Telefon",
            accessor: "phone"
          },
          {
            Header: "e-mail",
            accessor: "parentEmail"
          },
          {
            Header: "IP Adresa",
            accessor: "ip"
          },
          {
            Header: "Datum přihlášení",
            accessor: "signInDate"
          },
          {
            Header: "Datum splatnosti",
            accessor: "payTillDate"
          },
          {
            Header: "Datum úhrady",
            accessor: "paidDate"
          }
        ]
      }
    ], []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: props.people
  })

  console.log(props.people);
  return <div style={{ background: "white", height: "100%", width: "100%", display: "flex", fontSize: 12 }}>
    <table>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row)
        console.log(row.getRowProps())
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
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

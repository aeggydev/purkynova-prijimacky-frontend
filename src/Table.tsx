import { Settings, Mail } from "@mui/icons-material";
import { Person } from "./Person";
import { Grid, GridItem, Center, Button } from "@chakra-ui/react";

const person: Person = {
    id: "001",
    applicantName: "Tomáš",
    applicantSurname: "Jordan",
    parentName: "Martina",
    parentSurname: "Kolečková",
    parentEmail: "koleckova.martina@centrum.cz",
    schoolName: "Základní škola Želešice, Sadová, příspěvková organizace",
    phone: "7088541066",
    ip: "73.30.111.80",
    signInDate: "4. 11. 2022. 16:03",
    payTillDate: "19. 11. 2022",
    paidDate: null,
    variableSymbol: "2022001"
}
export function Table() {
  return (
    <div className="bg-white">
      <TableRow person={person} bg="#fff" />
      <TableRow person={person} bg="#eee" />
      <TableRow person={person} bg="#fff" />
    </div>
  );
}
export function TableRow(props: {person: Person, bg: string}) {
  return <Grid bg={props.bg} templateColumns="1fr 4fr 3fr 4fr 4fr 2fr 2fr 2fr 2fr 1fr 1fr" templateRows="repeat(3, 1fr)">
    <GridItem fontWeight="bold" pr="1px" rowSpan={2} colStart={1} fontSize="2xl">
      <Center>{props.person.id}</Center>
    </GridItem>
    <GridItem colStart={2} fontWeight="bold">{props.person.applicantName} {props.person.applicantSurname}</GridItem>
    <GridItem colStart={2}>{props.person.parentName} {props.person.parentSurname}</GridItem>
    <GridItem rowStart={1} colStart={3} colSpan={3} fontWeight="bold" color="gray">{props.person.schoolName}</GridItem>
    <GridItem rowStart={2} colStart={3} fontWeight="bold">{props.person.phone}</GridItem>
    <GridItem rowStart={2} colStart={4} fontWeight="bold" fontSize="sm" display="flex" justifyContent="start" alignItems="center">
        {props.person.parentEmail}
    </GridItem>
    <GridItem rowStart={2} colStart={5} fontWeight="bold" color="gray">{props.person.ip}</GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={6} display="flex" justifyContent="center" alignItems="center" fontWeight="bold" fontSize="2xl">
      {props.person.variableSymbol}
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={7} fontSize="sm" display="flex" justifyContent="center" alignItems="center" fontWeight="bold" color="gray">
      {props.person.signInDate}
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={8} fontWeight="bold" display="flex" justifyContent="center" alignItems="center">
      {props.person.payTillDate}
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={9} fontWeight="bold" display="flex" justifyContent="center" alignItems="center">
      {props.person.paidDate}
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={10} display="flex" justifyContent="center" alignItems="center">
      <Button bg="rgb(185, 28, 28)" rounded="0.25rem" h="60%" w="100%" display="flex" justifyContent="center" alignItems="center">
        <Mail style={{color: "white"}} />
      </Button>
    </GridItem>
    <GridItem rowStart={1} rowSpan={2} colStart={11} display="flex" justifyContent="center" alignItems="center">
      <Button h="60%" w="100%">
        <Settings />
      </Button>
    </GridItem>
    <GridItem colStart={2} colEnd={12} fontStyle="italic">Platba přijde o den později</GridItem>
  </Grid>
}

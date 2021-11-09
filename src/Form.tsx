import { Box, Text, FormControl, FormLabel, Input, Grid, GridItem } from "@chakra-ui/react";
import React from "react"

export default function Form() {
  // TODO: Add an option for people who are already 18

  return <Box textAlign="center" my="2.5%" mx="3%" px="7em">
    <Box boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" rounded="5px" mb="2.5%" py="1em" bg="#F9F9F9" display="flex"
         justifyContent="center" alignItems="center">
      <Text>Přihlášky přijímáme od 1. 11. 2022. Kapacita je <b>112/250</b>.</Text>
    </Box>
    <Box boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" rounded="5px" mb="2.5%" py="1em" bg="#F9F9F9" display="flex"
         justifyContent="center" alignItems="center">
      <Grid templateColumns="1fr 1fr">
        <GridItem gridRow={1} gridColumn={1}>
          <FormControl>
            <FormLabel>Jméno účastníka</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem gridRow={1} gridColumn={2}>
          <FormControl>
            <FormLabel>Příjmení účastníka</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Zákládní škola, obec</FormLabel>
            <Input type="text" />
          </FormControl>
        </GridItem>
        <FormControl>
          <FormLabel>Jméno zákonného zástupce</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Příjmení zákonného zástupce</FormLabel>
          <Input type="text" />
        </FormControl>
        <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>E-Mail zákonného zástupce</FormLabel>
          <Input type="email" />
        </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Telefonní číslo zákonného zástupce</FormLabel>
          {/* TODO: add checking of phone numbers */}
          <Input type="text" />
        </FormControl>
        </GridItem>
      </Grid>
    </Box>
  </Box>;
}
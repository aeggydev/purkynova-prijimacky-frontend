import { Box, FormControl, FormLabel, Input, Grid, GridItem } from "@chakra-ui/react";
import React from "react"
import { DummyApplicationCount } from "../ApplicationCount";
import ContentContainer from "../Containers/ContentContainer";

export default function Form() {
  // TODO: Add an option for people who are already 18

  return <ContentContainer>
    <DummyApplicationCount />
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
  </ContentContainer>;
}
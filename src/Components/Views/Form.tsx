import { Box, Button } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { DummyApplicationCount } from "../ApplicationCount";
import ContentContainer from "../Containers/ContentContainer";
import FormField from "../FormField";
import ShadowBox from "../Containers/ShadowBox";
import { FormSubmitBg, TopbarDarkBg } from "../../theme";

interface RowProps {
  row: number;
}

const Row = ({ children, row }: PropsWithChildren<RowProps>) => <>
  <Box gridRow={row}
       display="grid" gridAutoFlow="column" gridGap="12px">
    {children}
  </Box></>;

export default function Form() {
  // TODO: Add an option for people who are already 18

  return <ContentContainer>
    <DummyApplicationCount />
    <ShadowBox mx="4em">
      <Box display="grid">
        <Row row={1}>
          <FormField label="Jméno účastníka" />
          <FormField label="Příjmení účastníka" />
          {/*<InfoPopup onClose={() => alert("clicked")} show={true}><b>Hello!</b></InfoPopup>*/}
        </Row>
        <Row row={2}>
          <FormField label="Základní škola, obec" mb="2.5em" />
        </Row>
        <Row row={3}>
          <FormField label="Jméno zákonného zástupce" />
          <FormField label="Příjmení zákonného zástupce" />
        </Row>
        <Row row={4}>
          <FormField label="E-Mail zákonného zástupce" />
        </Row>
        <Row row={5}>
          <FormField label="Telefonní číslo zákonného zástupce" />
          {/* TODO: add checking of phone numbers */}
        </Row>
      </Box>
      <Button bg={FormSubmitBg} mt="2em" _hover={{ bg: TopbarDarkBg }} color="white">ODESLAT PŘIHLÁŠKU</Button>
    </ShadowBox>
  </ContentContainer>;
}
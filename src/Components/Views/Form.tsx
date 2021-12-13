import { Box, Button } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"
import { DummyApplicationCount } from "../ApplicationCount"
import ContentContainer from "../Containers/ContentContainer"
import FormField from "../FormField"
import ShadowBox from "../Containers/ShadowBox"
import { FormSubmitBg, TopbarDarkBg } from "../../theme"
import { IconType, InfoButton } from "../InfoPopup"

interface RowProps {
  row: number;
}

const Row = ({ children, row }: PropsWithChildren<RowProps>) => <>
  <Box gridRow={row} gridColumn={1}
       display="grid" gridGap="12px" gridAutoFlow="column">
    {children}
  </Box></>

const Form = () => {
  // TODO: Add an option for people who are already 18

  return <ContentContainer>
    <DummyApplicationCount />
    <ShadowBox mx="4em" position="relative" alignContent="center">
      <InfoButton icon={IconType.questionMark} position="absolute" top="10px" right="10px">
        V případě jakýchkoliv problémů s přihláškou nás neváhejte <u>kontaktovat</u>.
      </InfoButton>
      <Box display="grid" gridTemplateColumns="1fr 5%">
        <Row row={1}>
          <FormField label="Jméno účastníka" />
          <FormField label="Příjmení účastníka" />
        </Row>
        <Row row={2}>
          <FormField label="Základní škola, obec" mb="2.5em" />
        </Row>
        <Row row={3}>
          <FormField label="Jméno zákonného zástupce" />
          <FormField label="Příjmení zákonného zástupce" />
        </Row>
        <InfoButton icon={IconType.exclamationPoint} pt="0.5em" gridRow={3}>
          V případě, že už jste plnoletí, vyplňte do polí pro zákonného zástupce své jméno, e&#8209;mail a telefonní
          číslo. {/* TODO: replace escape sequence with css solution */}
        </InfoButton>
        <Row row={4}>
          <FormField label="E-Mail zákonného zástupce" />
        </Row>
        <Row row={5}>
          <FormField label="Telefonní číslo zákonného zástupce" />
          {/* TODO: add checking of phone numbers */}
          {/* TODO: should automatically fill in +420 */}
        </Row>
        <InfoButton icon={IconType.exclamationPoint} pt="0.5em" gridRow={5}>
          Telefonní číslo je pouze sekundární forma komunikace. Je možné zadat pouze čísla s českou předvolbou +420.
        </InfoButton>
      </Box>
      <Button bg={FormSubmitBg} mt="2em" _hover={{ bg: TopbarDarkBg }} color="white">ODESLAT PŘIHLÁŠKU</Button>
    </ShadowBox>
  </ContentContainer>
}
export default Form
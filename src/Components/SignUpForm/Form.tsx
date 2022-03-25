import ShadowBox from "../Containers/ShadowBox"
import { IconType, InfoButton } from "./InfoPopup"
import { Box, Button } from "@chakra-ui/react"
import FormField from "./FormField"
import { FormSubmitBg, TopbarDarkBg } from "../../theme"
import React, { useState } from "react"
import { Row } from "../Views/Form"
import { NewParticipantInput, useNewParticipantMutation } from "../../graphql/graphql"

export const StateDefault: NewParticipantInput = {
  participantName: "",
  participantSurname: "",
  school: "",
  parentName: "",
  parentSurname: "",
  email: "",
  phone: ""
}
export const FormContext = React.createContext([StateDefault, (x: typeof StateDefault) => {
}])

export default function Form() {
  const [state, setState] = useState(StateDefault)

  const [addMutation, _] = useNewParticipantMutation({
    variables: { addParticipant: state }
  })

  async function submit() {
    const mutation = await addMutation()
    console.log(`id: ${mutation.data?.addParticipant.id}`)
  }


  return <FormContext.Provider value={[state, setState]}>
    <ShadowBox mx="4em" position="relative" alignContent="center">
      <InfoButton icon={IconType.questionMark} position="absolute" top="10px" right="10px">
        V případě jakýchkoliv problémů s přihláškou nás neváhejte <u>kontaktovat</u>.
      </InfoButton>
      <Box display="grid" gridTemplateColumns="1fr 5%">
        <Row row={1}>
          <FormField label="Jméno účastníka" fieldName="participantName" />
          <FormField label="Příjmení účastníka" fieldName="participantSurname" />
        </Row>
        <Row row={2}>
          <FormField label="Základní škola, obec" mb="2.5em" fieldName="school" />
        </Row>
        <Row row={3}>
          <FormField label="Jméno zákonného zástupce" fieldName="parentName" />
          <FormField label="Příjmení zákonného zástupce" fieldName="parentSurname" />
        </Row>
        <InfoButton icon={IconType.exclamationPoint} pt="0.5em" gridRow={3}>
          V případě, že už jste plnoletí, vyplňte do polí pro zákonného zástupce své jméno, e&#8209;mail a telefonní
          číslo. {/* TODO: replace escape sequence with css solution */}
        </InfoButton>
        <Row row={4}>
          <FormField label="E-Mail zákonného zástupce" fieldName="email" />
        </Row>
        <Row row={5}>
          <FormField label="Telefonní číslo zákonného zástupce" fieldName="phone" />
          {/* TODO: add checking of phone numbers */}
          {/* TODO: should automatically fill in +420 */}
        </Row>
        <InfoButton icon={IconType.exclamationPoint} pt="0.5em" gridRow={5}>
          Telefonní číslo je pouze sekundární forma komunikace. Je možné zadat pouze čísla s českou předvolbou +420.
        </InfoButton>
      </Box>
      <Button bg={FormSubmitBg} mt="2em" _hover={{ bg: TopbarDarkBg }} color="white" onClick={submit}>ODESLAT
        PŘIHLÁŠKU</Button>
    </ShadowBox>
  </FormContext.Provider>
}

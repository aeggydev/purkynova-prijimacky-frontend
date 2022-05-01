import ShadowBox from "../../Containers/ShadowBox"
import { IconType, InfoButton } from "./InfoPopup"
import { Box, Button, FormControl, Input } from "@chakra-ui/react"
import { FormSubmitBg, TopbarDarkBg } from "../../../theme"
import React, { PropsWithChildren } from "react"
import { NewParticipantInput, useNewParticipantMutation } from "../../../graphql/graphql"
import { SubmitHandler, useForm } from "react-hook-form"
import ContentContainer from "../../Containers/ContentContainer"
import ApplicationCount from "../Reusable/ApplicationCount"

interface RowProps {
    row: number;
}

export const Row = ({ children, row }: PropsWithChildren<RowProps>) => (
    <Box gridRow={row} gridColumn={1}
         display="grid" gridGap="12px" gridAutoFlow="column">
        {children}
    </Box>
)

export default function DForm() {
    const { handleSubmit, register, formState: { isDirty, isValid, errors } } = useForm<NewParticipantInput>({
        mode: "onChange"
    })

    const [addMutation] = useNewParticipantMutation()

    const submit: SubmitHandler<NewParticipantInput> = async data => {
        const mutation = await addMutation({
            variables: { addParticipant: data }
        })
    }

    return (
        <ContentContainer>
            <ApplicationCount />
            <ShadowBox mx="4em" position="relative" alignContent="center">
                <form onSubmit={handleSubmit(submit)}>
                    <InfoButton icon={IconType.questionMark} position="absolute" top="10px" right="10px">
                        V případě jakýchkoliv problémů s přihláškou nás neváhejte <u>kontaktovat</u>.
                    </InfoButton>
                    <Box display="grid" gridTemplateColumns="1fr 5%" gridGap="1rem">
                        <Row row={1}>
                            <FormControl isInvalid={!!errors.participantName}>
                                <Input placeholder="Jméno účastníka" {...register("participantName", {
                                    required: true
                                })} shadow="md" />
                            </FormControl>
                            <FormControl isInvalid={!!errors.participantSurname}>
                                <Input placeholder="Příjmení účastníka" {...register("participantSurname", {
                                    required: true
                                })} shadow="md" />
                            </FormControl>
                        </Row>
                        <Row row={2}>
                            <FormControl isInvalid={!!errors.school}>
                                <Input placeholder="Základní škola, obec" {...register("school", {
                                    required: true
                                })} shadow="md" />
                            </FormControl>
                        </Row>
                        <Row row={3}>
                            <FormControl isInvalid={!!errors.parentName}>
                                <Input placeholder="Jméno zákonného zástipce" {...register("parentName", {
                                    required: true
                                })} shadow="md" />
                            </FormControl>
                            <FormControl isInvalid={!!errors.parentSurname}>
                                <Input placeholder="Příjmení zákonného zástupce" {...register("parentSurname", {
                                    required: true
                                })} shadow="md" />
                            </FormControl>
                        </Row>
                        <InfoButton icon={IconType.exclamationPoint} pt="0.5em" gridRow={3}>
                            V případě, že už jste plnoletí, vyplňte do polí pro zákonného zástupce své jméno,
                            e&#8209;mail a
                            telefonní
                            číslo. {/* TODO: replace escape sequence with css solution */}
                        </InfoButton>
                        <Row row={4}>
                            <FormControl isInvalid={!!errors.email}>
                                <Input type="email" placeholder="E-Mail zákonného zástupce" {...register("email", {
                                    required: true
                                })} shadow="md" />
                            </FormControl>
                        </Row>
                        <Row row={5}>
                            <FormControl isInvalid={!!errors.phone}>
                                <Input type="tel"
                                       placeholder="Telefonní číslo zákonného zástupce" {...register("phone", {
                                    required: true
                                })} shadow="md" />
                            </FormControl>
                        </Row>
                        <InfoButton icon={IconType.exclamationPoint} pt="0.5em" gridRow={5}>
                            Telefonní číslo je pouze sekundární forma komunikace. Je možné zadat pouze čísla s českou
                            předvolbou
                            +420.
                        </InfoButton>
                    </Box>
                    <Button type="submit" disabled={!isValid || !isDirty}
                            bg={FormSubmitBg} mt="2em" _hover={{ bg: TopbarDarkBg }} color="white">
                        ODESLAT PŘIHLÁŠKU
                    </Button>
                </form>
            </ShadowBox>
        </ContentContainer>
    )
}

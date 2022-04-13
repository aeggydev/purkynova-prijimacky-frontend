import {
    Button,
    Grid,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react"
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons"
import styled from "styled-components"
import { useRef } from "react"
import { GetParticipantsDocument, NewParticipantInput, useNewParticipantMutation } from "../../../../../graphql/graphql"
import { SubmitHandler, useForm } from "react-hook-form"

interface IProps {
    setStatus: (newState: boolean) => void // Close or open the modal
    isOpen: boolean
}

interface FormFields extends NewParticipantInput {
}

export function RegisterParticipant({ isOpen, setStatus }: IProps) {
    const initialFocusRef = useRef<any>()
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormFields>()
    const [newParticipant] = useNewParticipantMutation({
        refetchQueries: [GetParticipantsDocument]
    })
    const { ref: partNameRef, ...partNameRest } = register("participantName")

    function onClose() {
        setStatus(false)
    }

    const onSubmit: SubmitHandler<FormFields> = async data => {
        const returned = await newParticipant({ variables: { addParticipant: data } })
        setStatus(false)
        reset()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}
               initialFocusRef={initialFocusRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Přidat účastníka</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="grid" gridGap="1ex">
                    <SForm onSubmit={handleSubmit(onSubmit)}>
                        <Grid templateColumns="1fr 1fr">
                            <Input placeholder="Jméno účastníka"
                                   {...partNameRest}
                                   ref={(e) => {
                                       partNameRef(e)
                                       initialFocusRef.current = e
                                   }}
                                   roundedRight="none" />
                            <Input placeholder="Příjmení účastníka"
                                   {...register("participantSurname")}
                                   roundedLeft="none" />
                        </Grid>
                        <Input placeholder="Základní škola, obec"
                               {...register("school")} />
                        <Grid templateColumns="1fr 1fr">
                            <Input placeholder="Jméno zák. zást."
                                   {...register("parentName")}
                                   roundedRight="none" />
                            <Input placeholder="Příjmení zák. zást."
                                   {...register("parentSurname")}
                                   roundedLeft="none" />
                        </Grid>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<EmailIcon color="gray.600" />}
                            />
                            <Input type="email" placeholder="E-Mail zákonného zástupce"
                                   {...register("email")} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<PhoneIcon color="gray.600" />}
                            />
                            <Input placeholder="Telefonní číslo zákonného zástupce"
                                   {...register("phone")} />
                        </InputGroup>
                        {/* Add other props useful to the admin */}
                    </SForm>
                </ModalBody>

                <ModalFooter display="flex">
                    <Button onClick={() => handleSubmit(onSubmit)()} flexGrow={1} mr={3}>Registrovat</Button>
                    <Button onClick={onClose}>Zavřít</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const SForm = styled.form`
    display: grid;
    gap: 1ex;
`

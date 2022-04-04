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

interface IProps {
    setStatus: (newState: boolean) => void // Close or open the modal
    isOpen: boolean
}

export function RegisterParticipant({ isOpen, setStatus }: IProps) {
    const initialRef = useRef<any>()

    function onClose() {
        setStatus(false)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}
               initialFocusRef={initialRef}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Přidat účastníka</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SForm>
                        <Grid templateColumns="1fr 1fr">
                            <Input placeholder="Jméno účastníka"
                                   ref={initialRef}
                                   roundedRight="none" />
                            <Input placeholder="Příjmení účastníka"
                                   roundedLeft="none" />
                        </Grid>
                        <Input placeholder="Základní škola, obec" />
                        <Grid templateColumns="1fr 1fr">
                            <Input placeholder="Jméno zák. zást."
                                   roundedRight="none" />
                            <Input placeholder="Příjmení zák. zást."
                                   roundedLeft="none" />
                        </Grid>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<PhoneIcon color="gray.600" />}
                            />
                            <Input type="email" placeholder="E-Mail zákonného zástupce" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<EmailIcon color="gray.600" />}
                            />
                            <Input placeholder="Telefonní číslo zákonného zástupce" />
                        </InputGroup>
                        {/* Add other props useful to the admin */}
                    </SForm>
                </ModalBody>

                <ModalFooter display="flex">
                    <Button flexGrow={1} mr={3}>Registrovat</Button>
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

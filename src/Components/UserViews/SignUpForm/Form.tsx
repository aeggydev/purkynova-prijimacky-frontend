import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    SimpleGrid,
    Text
} from "@chakra-ui/react"
import { FieldErrors, RegisterOptions, SubmitHandler, useForm, UseFormRegister } from "react-hook-form"
import { NewParticipantInput, useNewParticipantMutation } from "../../../graphql/graphql"
import { useIsMobile, useIsMobileTernary } from "../../../hooks/useIsMobile"
import React, { useContext, useState } from "react"
import { FormSubmitBg, TopbarBg, TopbarDarkBg } from "../../../theme"
import { EmailIcon } from "@chakra-ui/icons"
import { NavLink } from "react-router-dom"

const RequiredError = { value: true, message: "Prosím doplňte pole" }

interface IContext {
    register: UseFormRegister<NewParticipantInput>
    errors: FieldErrors<NewParticipantInput>
}

const Context = React.createContext({} as IContext)

export default function Form() {
    const isMobile = useIsMobile()
    const columnSpan = useIsMobileTernary(undefined, "1 / 3")
    const [isDone, setIsDone] = useState(false)

    const { handleSubmit, register, formState: { isDirty, isValid, errors } } = useForm<NewParticipantInput>({
        mode: "onChange"
    })

    const [addMutation] = useNewParticipantMutation()

    const submit: SubmitHandler<NewParticipantInput> = async data => {
        const mutation = await addMutation({
            variables: { addParticipant: data }
        })

        setIsDone(true)
        console.log("submitted data: ", data)
    }

    const form = <Context.Provider value={{ register, errors }}>
        <SimpleGrid as="form" onSubmit={handleSubmit(submit)} my="1.5em">
            <SimpleGrid columns={isMobile ? 1 : 2} gridGap="1rem">
                <Heading size="md" gridColumn={columnSpan}>Informace o účastníkovi</Heading>
                <Control placeholder="Jméno účastníka" prop="participantName" options={{ required: RequiredError }} />
                <Control placeholder="Příjmení účastníka" prop="participantSurname"
                         options={{ required: RequiredError }} />
                <Control placeholder="Základní škola, obec" prop="school" options={{ required: RequiredError }}
                         desktopSpan bottomMargin="1em" />

                <Box gridColumn={columnSpan}>
                    <Heading size="md">Informace o zástupci</Heading>
                    <Text color="gray.500" fontSize="sm" my="0.5em">
                        Pokud jste již plnoletí, vyplňte do těchto políček vaše vlastní údaje
                    </Text>
                </Box>
                <Control placeholder="Jméno zákonného zástupce" prop="parentName"
                         options={{ required: RequiredError }} />
                <Control placeholder="Příjmení zákonného zástupce" prop="parentSurname"
                         options={{ required: RequiredError }} />
                <Control type="email" placeholder="E-mail zákonného zástupce" prop="email"
                         options={{ required: RequiredError }} desktopSpan />
                {/* TODO: Add validation */}
                <Control type="tel" placeholder="Telefonní číslo zákonného zástupce" prop="phone"
                         options={{ required: RequiredError }} desktopSpan
                         helper="Je možné zadat pouze čísla s českou předvolbou +420. Telefonní číslo slouží jako záloha" />
                {/* TODO: Add validation */}
            </SimpleGrid>
            <Button type="submit" disabled={!isValid || !isDirty}
                    justifySelf="center" textTransform="uppercase"
                    bg={FormSubmitBg} mt="2em" _hover={{ bg: TopbarDarkBg }} color="white">
                Odeslat přihlášku
            </Button>
        </SimpleGrid>
    </Context.Provider>

    const done = <Box py="2em" px="5%" textAlign="center" display="grid" justifyContent="center">
        Děkujeme za přihlášení. Na e-mail Vám byly odeslány informace o platbě a variabilní symbol, pod kterým uhradíte
        požadovanou částku.<br /><br />

        Pokud e-mail nevidíte, zkontrolujte složku na spam. Pokud Vám e-mail vůbec nepřišel, <u>kontaktujte nás
        prosím.</u>

        <NavLink to="/main">
            <Button bg={TopbarBg} color="white" mt="1em">Zpět na hlavní stránku</Button>
        </NavLink>
    </Box>

    return isDone ? done : form
}

interface ControlProps {
    placeholder: string
    helper?: string
    prop: keyof NewParticipantInput
    options: RegisterOptions
    bottomMargin?: string
    type?: React.HTMLInputTypeAttribute
    desktopSpan?: boolean // Span two columns when on pc
}

function Control(props: ControlProps) {
    const context = useContext(Context)
    const isInvalid = !!context.errors[props.prop]
    const mobile = useIsMobile()

    let leftSide = null
    switch (props.type) {
        case "email":
            leftSide = <InputLeftElement children={<EmailIcon color="gray.500" />} />
            break
        case "tel":
            leftSide = <InputLeftAddon color="gray.600">+420</InputLeftAddon>
    }

    return <FormControl isInvalid={isInvalid} isRequired mb={props.bottomMargin}
                        gridColumn={!mobile && props.desktopSpan ? "1 / 3" : undefined}>
        <FormLabel mb="0.4em" textAlign="left">{props.placeholder}</FormLabel>
        <InputGroup rounded="md">
            {leftSide}
            <Input {...context.register(props.prop, props.options)} bg="white"
                   type={props.type} boxShadow="inset 0px 2px 2px rgba(0, 0, 0, 0.25)"
            />
        </InputGroup>
        {isInvalid
            ? <FormErrorMessage>{context.errors[props.prop]?.message}</FormErrorMessage>
            : props.helper
                ? <FormHelperText textAlign="left">{props.helper}</FormHelperText>
                : null
        }
    </FormControl>
}

// Place these somewhere
/*
V případě, že už jste plnoletí, vyplňte do polí pro zákonného zástupce své jméno, e-mail a telefonní číslo.
*/
/*
Telefonní číslo je pouze sekundární forma komunikace. Je možné zadat pouze čísla s českou předvolbou +420.
*/
/*
V případě jakýchkoliv problémů s přihláškou nás neváhejte <u>kontaktovat</u>.
*/

import ContentContainer from "../Containers/ContentContainer"
import React, { PropsWithChildren } from "react"
import styled from "styled-components"
import ShadowBox from "../Containers/ShadowBox"
import { Button, FormControl, FormErrorMessage, Input, Switch } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useGetSettingsQuery, useUpdateSettingsMutation } from "../../graphql/graphql"
import { DateTime } from "luxon"

interface IFormInputs {
    capacity: number
    allowedOver: number
    signUpAllowed: boolean
    signUpUntil: string
    signUpFrom: string
}

export function Settings() {
    const { data, loading, error, refetch } = useGetSettingsQuery()
    const [updateSettings, {}] = useUpdateSettingsMutation({
        onCompleted: async () => {
            const refetched = await refetch()
            reset(refetched.data.settings)
        }
    })
    const { __typename: _, ...initialData } = data!.settings
    if (loading) return <p>Loading!</p>
    const { register, handleSubmit, formState, reset, getValues } = useForm<IFormInputs>({
        defaultValues: initialData
    })
    const onSubmit: SubmitHandler<IFormInputs> = submitData => {
        updateSettings({ variables: { updateSettings: submitData } })
    }

    const dirty = Object.keys(formState.dirtyFields).length > 0

    return <ContentContainer>
        <ShadowBox>
            <SForm onSubmit={handleSubmit(onSubmit)}>
                <Row
                    title="Maximální kapacita"
                    description="Maximální počet účastníků, kteří se skutečně zůčastní. Při překročení jsou přihlášky pod čarou."
                >
                    <Input type="number" {...register("capacity", { valueAsNumber: true, required: true })} />
                </Row>
                <Row
                    title="Povolená místa pod čarou"
                    description="Kolik přihlášek je možno přijmout nad maximální kapacitu před uzavřením přihlášek."
                >
                    <Input type="number" {...register("allowedOver", { valueAsNumber: true, required: true })} />
                </Row>
                <Row
                    title="Přihlášení v provozu"
                    description="Zda je přihlášení veřejně přístupné."
                >
                    <Switch {...register("signUpAllowed")} />
                </Row>
                <Row title="Datum zahájení"
                     description="Datum od kdy se berou přihlášky">
                    <Input type="date" {...register("signUpFrom", {
                        required: true
                    })} required />
                </Row>
                <Row title="Konečné datum"
                     description="Datum kdy se uzavřou přihlášky">
                    <FormControl isInvalid={!!formState.errors.signUpUntil}>
                        <Input type="date" {...register("signUpUntil", {
                            required: true,
                            validate: value => {
                                const signUpFromDate = DateTime.fromISO(getValues().signUpFrom)
                                const signUpUntilDate = DateTime.fromISO(value)
                                const validated = signUpUntilDate.toSeconds() > signUpFromDate.toSeconds()
                                if (!validated) {
                                    return "Datum musí být větší než datum zahájení"
                                }
                            }
                        })} required />
                        {formState.errors?.signUpUntil
                            ? <FormErrorMessage>{formState.errors.signUpUntil!.message}</FormErrorMessage>
                            : ""}
                    </FormControl>
                </Row>
                <Button type="submit" disabled={!dirty}
                        justifySelf="end" mt="6" mr="6">Uložit změny</Button>
            </SForm>
        </ShadowBox>
    </ContentContainer>
}

interface RowProps {
    title: string
    description: string
}

function Row(props: PropsWithChildren<RowProps>) {
    return <SRow>
        <SDescription>
            <span>{props.title}</span>
            <span>{props.description}</span>
        </SDescription>
        <span>{props.children}</span>
    </SRow>
}

const SDescription = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    text-align: left;

    & :first-child {
        font-size: 1.1em;
        font-weight: 500;
    }

    & :last-child {
        font-size: 0.95em;
    }
`
const SRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const SForm = styled.form`
    width: 100%;
    height: 100%;
    display: grid;
`

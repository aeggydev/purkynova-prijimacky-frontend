import { Box, Button, Input, Text } from "@chakra-ui/react"
import styled from "styled-components"
import { FormSubmitBg, TopbarDarkBg } from "../theme"
import Cross from "../Icons/Cross"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useLoginLazyQuery } from "../graphql/graphql"
import { useDispatch } from "react-redux"
import { setLoggedIn, setShowLogin } from "../store/login"
import { useHistory } from "react-router-dom"

interface IFormInputs {
    username: string
    password: string
}

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>()
    const history = useHistory()
    const dispatch = useDispatch()
    const [login, { data, error: loginError }] = useLoginLazyQuery({
        errorPolicy: "all",
        onCompleted: data => {
            console.log(loginError?.message)
            localStorage.setItem("token", data.login)
            dispatch(setShowLogin(false))
            dispatch(setLoggedIn(true))
            history.push("/dashboard")
        }
    })

    function exit() {
        dispatch(setShowLogin(false))
    }

    function dontPropagate(e: React.MouseEvent) {
        e.stopPropagation()
    }

    const onSubmit: SubmitHandler<IFormInputs> = ({ username, password }) => {
        login({ variables: { username, password } })
    }

    return (
        <SLogin onClick={exit}>
            <SLoginForm onClick={dontPropagate} onSubmit={handleSubmit(onSubmit)}>
                <Box display="grid">
                    <Box onClick={exit} justifySelf="end" cursor="pointer">
                        <Cross color="black" />
                    </Box>
                    <Text textAlign="center" fontWeight="600">Přihlášení administrátora</Text>
                </Box>
                <SFormInputs>
                    <Input placeholder="Přihlašovací jméno" type="text" autoComplete="off"
                           {...register("username", {
                               required: {
                                   value: true,
                                   message: "Musíte zadat přihlašovací jméno"
                               }
                           })} />
                    {errors.username && <SFormError>{errors.username.message}</SFormError>}
                    <Input placeholder="Heslo" type="password"
                           {...register("password", {
                               required: {
                                   value: true,
                                   message: "Musíte zadat heslo"
                               }
                           })} />
                    <SFormError>{errors.password?.message}</SFormError>
                </SFormInputs>
                <SFormError>{loginError?.message}</SFormError>
                <Button type="submit"
                        bg={FormSubmitBg} _hover={{ bg: TopbarDarkBg }} color="white">Přihlásit se</Button>
            </SLoginForm>
        </SLogin>
    )
}

const SFormInputs = styled.div`
    padding-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
`
const SFormError = styled.div`
    margin-left: 1ex;
    font-size: 0.95em;
    color: #ef4444;
`
const SLoginForm = styled.form`
    background: #F9F9F9;
    cursor: auto;
    display: grid;
    grid-template-rows: auto 1fr auto auto;
    justify-content: stretch;
    gap: 1rem;
    padding: 0.75rem;
    z-index: 110;
    min-width: 25vw;
    min-height: 50vh;

    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
`
const SLogin = styled.div`
    display: grid;
    place-content: center;
    cursor: pointer;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;

    background: rgba(0, 0, 0, 0.90);
`

import {
    Box,
    Button,
    ChakraProps,
    FormControl,
    FormErrorMessage,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react"
// @ts-ignore
import { GrayText } from "../../theme"
import { useDispatch, useSelector } from "react-redux"
import { setLoggedIn } from "../../store/login"
import { RootState } from "../../store/store"
import { useHistory } from "react-router-dom"
import { SettingsIcon } from "@chakra-ui/icons"
import { SubmitHandler, useForm } from "react-hook-form"
import { useLoginLazyQuery } from "../../graphql/graphql"
import { useRef } from "react"

interface IFormInputs {
    username: string
    password: string
}

const AdminButton = (props: ChakraProps) => {
    const initialFocusRef = useRef<any>()
    const dispatch = useDispatch()
    const history = useHistory()
    const toast = useToast()
    const loginState = useSelector((state: RootState) => state.login)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors, isDirty, isValid },
        reset
    } = useForm<IFormInputs>({
        mode: "onChange"
    })
    const [loginFunc] = useLoginLazyQuery({
        errorPolicy: "all",
        onCompleted: data => {
            localStorage.setItem("token", data.login)
            dispatch(setLoggedIn(true))
            history.push("/dashboard")
        },
        onError: e => {
            const networkMessage = (e.networkError as any).result.errors[0].message
            let errorMessage: string
            if (networkMessage === "Invalid username" || networkMessage === "Invalid password") {
                errorMessage = "Špatné uživatelské jméno nebo heslo"
            } else {
                errorMessage = e.message
            }
            toast({ title: "Nastala chyba při přihlašování", status: "warning", description: errorMessage })
            reset()
        }
    })

    const onClick = loginState.loggedIn ? logout : login
    const text = loginState.loggedIn
        ? "ODHLÁSIT"
        : "ADMINISTRÁTOR"

    function login() {
        onOpen()
    }

    function logout() {
        localStorage.removeItem("token")
        dispatch(setLoggedIn(false))
        history.push("/")
    }

    const onSubmit: SubmitHandler<IFormInputs> = ({ username, password }) => {
        loginFunc({ variables: { username, password } })
    }

    const { ref: usernameRef, ...usernameRest } = {
        ...register("username",
            {
                required: {
                    value: true,
                    message: "Musíte zadat přihlašovací jméno"
                }
            })
    }

    return <>
        <Modal onClose={onClose} isOpen={isOpen} initialFocusRef={initialFocusRef}>
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent>
                <ModalHeader>Přihlášení administrátora</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box display="grid" gridGap="1rem">
                            <FormControl isInvalid={!!formErrors.username}>
                                <Input placeholder="Přihlašovací jméno" type="text" autoComplete="off"
                                       {...usernameRest}
                                       ref={(e) => {
                                           usernameRef(e)
                                           initialFocusRef.current = e
                                       }}
                                />
                                {formErrors.username
                                    ? <FormErrorMessage>{formErrors!.username.message}</FormErrorMessage>
                                    : ""}
                            </FormControl>
                            <FormControl isInvalid={!!formErrors.password}>
                                <Input placeholder="Heslo" type="password" autoComplete="off"
                                       {...register("password", {
                                           required: {
                                               value: true,
                                               message: "Musíte zadat heslo"
                                           }
                                       })} />
                                {formErrors.password
                                    ? <FormErrorMessage>{formErrors!.password.message}</FormErrorMessage>
                                    : ""}
                            </FormControl>
                        </Box>
                    </form>
                </ModalBody>

                <ModalFooter display="flex">
                    <Button colorScheme="green" flexGrow={1}
                            disabled={!isDirty || !isValid}
                            onClick={() => handleSubmit(onSubmit)()}>
                        Přihlásit se
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <Box display="flex" color={GrayText} cursor="pointer" {...props} alignItems="center">
            <SettingsIcon mr="0.25rem" />
            <Text userSelect="none" onClick={onClick}>{text}</Text>
        </Box>
    </>
}
export default AdminButton

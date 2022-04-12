import { Box, ChakraProps, Text } from "@chakra-ui/react"
// @ts-ignore
import { GrayText } from "../../theme"
import { useDispatch, useSelector } from "react-redux"
import { setLoggedIn, setShowLogin } from "../../store/login"
import { RootState } from "../../store/store"
import { useHistory } from "react-router-dom"
import { SettingsIcon } from "@chakra-ui/icons"

const AdminButton = (props: ChakraProps) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const loginState = useSelector((state: RootState) => state.login)

    const onClick = loginState.loggedIn ? logout : login
    const text = loginState.loggedIn
        ? "ODHLÁSIT"
        : "ADMINISTRÁTOR"

    function login() {
        dispatch(setShowLogin(true))
    }

    function logout() {
        localStorage.removeItem("token")
        dispatch(setLoggedIn(false))
        history.push("/")
    }

    return <Box display="flex" color={GrayText} cursor="pointer" {...props} alignItems="center">
        <SettingsIcon mr="0.25rem" />
        <Text userSelect="none" onClick={onClick}>{text}</Text>
    </Box>
}
export default AdminButton

import { Box, ChakraProps, Text } from "@chakra-ui/react"
// @ts-ignore
import { GrayText } from "../theme"
import Settings from "../Icons/Settings"
import { useDispatch } from "react-redux"
import { setShowLogin } from "../store/login"

const AdminButton = (props: ChakraProps) => {
    const dispatch = useDispatch()

    function login() {
        dispatch(setShowLogin(true))
    }

    return <Box display="flex" color={GrayText} cursor="pointer" {...props}>
        <Settings color={GrayText} />
        <Text userSelect="none" onClick={login}>ADMIN</Text>
    </Box>
}
export default AdminButton

import { Box, ChakraProps, Text } from "@chakra-ui/react"
// @ts-ignore
import { GrayText } from "../theme"
import Settings from "../Icons/Settings"
import { useContext } from "react"
import { AppContext } from "../App"

const AdminButton = (props: ChakraProps) => {
    const appContext = useContext(AppContext)

    return <Box display="flex" color={GrayText} cursor="pointer" {...props}>
        <Settings color={GrayText} />
        <Text userSelect="none" onClick={appContext.login}>ADMIN</Text>
    </Box>
}
export default AdminButton

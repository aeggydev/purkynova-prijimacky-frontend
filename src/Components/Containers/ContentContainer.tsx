import { Box, ChakraProps, Grid, Text } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { GrayText } from "../../theme"
import AdminButton from "../Layout/AdminButton"

interface Props {
    insideBox?: ChakraProps
}

export default function ContentContainer(props: PropsWithChildren<Props>) {
    return <Box mt="2.5%" display="grid" position="relative" flexGrow={1}>
        <Box pb="1%" px="7em" mx="3%" {...(props.insideBox || {})}>
            {props.children}
        </Box>
        <Grid templateColumns="1fr 1fr 1fr" w="100%" pr="6px" position="absolute" bottom="1">
            <Text color={GrayText} gridColumn="2">
                © Střední průmyslová škola Brno, Purkyňova, příspěvková organizace
            </Text>
            <AdminButton gridColumn="3" justifySelf="end" />
        </Grid>
    </Box>
}

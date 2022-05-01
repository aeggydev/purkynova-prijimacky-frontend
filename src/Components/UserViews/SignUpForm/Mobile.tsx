import { Box } from "@chakra-ui/react"
import ApplicationCount from "../Reusable/ApplicationCount"
import Form from "./Form"
import { useIsMobileProp } from "../../../hooks/useIsMobile"

export default function MForm() {
    const mx = useIsMobileProp("1ex")

    return <Box px="2em">
        <ApplicationCount />
        <Box mx={mx}>
            <Form />
        </Box>
    </Box>
}

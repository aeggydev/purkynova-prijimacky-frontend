import { Box, ChakraProps } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { BoxBg } from "../../theme"

export default function ShadowBox(props: PropsWithChildren<ChakraProps>) {
    return <Box boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" borderRadius="5px"
                bg={BoxBg} textAlign="center"
                py="2em" px="5em" mb="2.5%" rounded="5px" {...props}>
        {props.children}
    </Box>
}

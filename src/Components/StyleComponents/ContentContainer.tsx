import { Box } from "@chakra-ui/react"
import { PropsWithChildren } from "react";

export default ({children}: PropsWithChildren<{}>) => {
  return <Box my="2.5%" mx="3%" px="7em">
    {children}
  </Box>
}
import { Box, ChakraProps, Text } from "@chakra-ui/react"
// @ts-ignore
import { GrayText } from "../theme"
import Settings from "../Icons/Settings"

const AdminButton = (props: ChakraProps) => <Box display="flex" color={GrayText} {...props}>
  <Settings color={GrayText} />
  <Text userSelect="none">ADMIN</Text>
</Box>
export default AdminButton
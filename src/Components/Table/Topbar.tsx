import { Box, Button } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { merge } from "../../store/table"

export const Topbar = () => {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(merge())
  }

  return <Box>
    <Button onClick={onClick}>Merge</Button>
  </Box>
}
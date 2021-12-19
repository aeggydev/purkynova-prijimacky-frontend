import { Box, Button, ChakraProps, Input, Text } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { merge } from "../../store/table"
import { PropsWithChildren } from "react"
import Search from "../../Icons/Search"
import Filter from "../../Icons/Filter"
import Cancel from "../../Icons/Cancel"

interface BarButtonProps extends ChakraProps {
  onClick?: () => void
}

const BarButton = (props: PropsWithChildren<BarButtonProps>) => (
  <Button color="white" bg="#46BC87" _hover={{ background: "gray" }}
          {...props}
  >
    {props.children}
  </Button>
)

export const Topbar = () => {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(merge())
  }

  return <Box w="100%">
    <Box d="flex" flexDir="row" alignItems="center">
      <BarButton flexGrow={1} onClick={onClick}>Potvrdit změny</BarButton>
      <BarButton bg="#AC1821" color="white" flexGrow={1}>Zahodit změny</BarButton>
      <Text flexGrow={1}>Do ukončení režimu úpravy zbýva 05:16. Úprava zahájena 28.11.2021 08:21.</Text>
    </Box>
    <Box d="flex" alignItems="center">
      <BarButton>Potvrdit uhrazené</BarButton>
      <BarButton>Zrušit neuhrazené po termínu</BarButton>
      <BarButton>Přidat přihlášku</BarButton>
      <BarButton>Stáhnout</BarButton>
    </Box>
    <Box d="flex" justifyContent="space-between">
      <Box d="flex" flexDir="row" alignItems="center">
        <Box px=".75em">
          <Search color="black" />
        </Box>
        <Input />
      </Box>
      <Box d="flex" flexDir="row" alignItems="center">
        <Box d="flex" justifyContent="space-between"
             fontWeight="bold"
             pl="1ex"
             bg="#D9D9D9" borderRadius="15px">
          <Text pr="2em">Aktivní filtry: 2</Text>
          <Box><Cancel color="black" /></Box>
        </Box>
        <Box pl="2em">
          <Filter color="black" />
        </Box>
      </Box>
    </Box>
  </Box>
}
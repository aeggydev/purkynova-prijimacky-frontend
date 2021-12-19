import { Box, Button, ChakraProps, Input, Text } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { merge } from "../../store/table"
import { PropsWithChildren } from "react"
import Search from "../../Icons/Search"
import Filter from "../../Icons/Filter"
import Cancel from "../../Icons/Cancel"
import Save from "../../Icons/Save"
import DownloadExport from "../../Icons/DownloadExport"
import ForceAdd from "../../Icons/ForceAdd"
import EmailCancel from "../../Icons/EmailCancel"
import EmailConfirm from "../../Icons/EmailConfirm"

interface BarButtonProps extends ChakraProps {
  onClick?: () => void
  icon?: JSX.Element
}

const BarButton = (props: PropsWithChildren<BarButtonProps>) => (
  <Button pl=".75em" pr="2em" mr="2ex"
          color="white" bg="#46BC87" _hover={{ background: "gray" }} _active={{background: "black"}}
          {...props}
  >
    <Box as="span" mr="2ex">{props.icon || null}</Box> {props.children}
  </Button>
)

export const Topbar = () => {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(merge())
  }

  return <Box w="100%">
    <Box px="3em">
      <Box d="flex" flexDir="row" alignItems="center" mb=".75em">
        <BarButton onClick={onClick} icon={<Save color="white" />}>Potvrdit změny</BarButton>
        <BarButton bg="#AC1821" color="white" icon={<Cancel color="white" />}>Zahodit změny</BarButton>
        <Text fontWeight="bold" ml="auto">Do ukončení režimu úpravy zbýva 05:16. Úprava zahájena 28.11.2021 08:21.</Text>
      </Box>
      <Box d="flex" alignItems="center" justifyContent="center" mb=".5em">
        <BarButton bg="#CBBE4D" icon={<EmailConfirm color="white" />}>Potvrdit uhrazené</BarButton>
        <BarButton bg="#AC1821" icon={<EmailCancel color="white" />}>Zrušit neuhrazené po termínu</BarButton>
        <BarButton icon={<ForceAdd color="white" />}>Přidat přihlášku</BarButton>
        <BarButton icon={<DownloadExport color="white" />}>Stáhnout</BarButton>
      </Box>
    </Box>
    <Box d="flex" justifyContent="space-between" mb="0.75ex">
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
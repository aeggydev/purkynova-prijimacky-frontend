import { Box, Button, ChakraProps, Input, Text } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { createPersonInCopy, merge } from "../../store/table"
import { PropsWithChildren } from "react"
import Search from "../../Icons/Search"
import Filter from "../../Icons/Filter"
import Cancel from "../../Icons/Cancel"
import Save from "../../Icons/Save"
import DownloadExport from "../../Icons/DownloadExport"
import ForceAdd from "../../Icons/ForceAdd"
import EmailCancel from "../../Icons/EmailCancel"
import EmailConfirm from "../../Icons/EmailConfirm"
import { Person } from "../../Types/Person"
import Chance from "chance"
import { useAppSelector } from "../../store/hooks"
import _ from "lodash"

interface BarButtonProps extends ChakraProps {
  onClick?: () => void
  icon?: JSX.Element
}

const chance = new Chance()

const BarButton = (props: PropsWithChildren<BarButtonProps>) => (
  <Button pl=".75em" pr="2em" mr="2ex"
          color="white" bg="#46BC87" _hover={{ background: "gray" }} _active={{ background: "black" }}
          {...props}
  >
    <Box as="span" mr="2ex">{props.icon || null}</Box> {props.children}
  </Button>
)

export const Topbar = () => {
  const dispatch = useDispatch()
  const table = useAppSelector((state) => state.table)
  const saveChanges = () => {
    dispatch(merge())
  }
  const randomPerson = () => {
    const [pName, pSur] = chance.name().split(" ")
    const [aName, aSur] = chance.name().split(" ")

    const signInDateC = chance.date({ year: 2022 }) as Date
    const paidDateC = chance.date({ year: 2022 }) as Date
    const payTillDateC = chance.date({ year: 2022 }) as Date

    const lastIdS = _.last(table.people)!.id
    const lastIdN = _.toNumber(lastIdS) + 1
    const id = _.padStart(lastIdN.toString(), 3, "0")

    const person: Person = {
      ip: chance.ip(),
      id,
      parentSurname: pSur,
      parentName: pName,
      parentEmail: chance.email(),
      applicantName: aName,
      applicantSurname: aSur,
      phone: chance.phone({ formatted: false }),
      schoolName: chance.word() + " škola",
      signInDate: signInDateC.toISOString(),
      paidDate: paidDateC.toISOString(),
      payTillDate: payTillDateC.toISOString(),
      personalId: chance.integer({ min: 1, max: 999 }).toString(),
      variableSymbol: chance.integer({ min: 2022003, max: 2999999 }).toString()
    }
    dispatch(createPersonInCopy({ person }))
    dispatch(merge())
  }

  return <Box w="100%">
    <Box px="3em">
      <Box d="flex" flexDir="row" alignItems="center" mb=".75em">
        <BarButton onClick={saveChanges} icon={<Save color="white" />}>Potvrdit změny</BarButton>
        <BarButton bg="#AC1821" color="white" icon={<Cancel color="white" />}>Zahodit změny</BarButton>
        <Text fontWeight="bold" ml="auto">Do ukončení režimu úpravy zbýva 05:16. Úprava zahájena 28.11.2021
          08:21.</Text>
      </Box>
      <Box d="flex" alignItems="center" justifyContent="center" mb=".5em">
        <BarButton bg="#CBBE4D" icon={<EmailConfirm color="white" />}>Potvrdit uhrazené</BarButton>
        <BarButton bg="#AC1821" icon={<EmailCancel color="white" />}>Zrušit neuhrazené po termínu</BarButton>
        <BarButton icon={<ForceAdd color="white" />}>Přidat přihlášku</BarButton>
        <BarButton icon={<DownloadExport color="white" />}>Stáhnout</BarButton>
        <BarButton onClick={randomPerson}>Náhodná přihláška</BarButton>
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
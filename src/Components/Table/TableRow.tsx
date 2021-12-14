import { Person } from "../../Types/Person"
import { DateTime } from "luxon"
import React, {
  ChangeEvent,
  FocusEvent,
  MutableRefObject,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState
} from "react"
import { Button, GridItem, GridItemProps, Input } from "@chakra-ui/react"
import Email from "../../Icons/Email"
import Settings from "../../Icons/Settings"
import { HorizontalSplit, VerticalSplit } from "./LayoutComponents"
import { TableCellEdited } from "../../theme"
import { useDispatch } from "react-redux"
import { setProperty } from "../../store/table"
import { useAppSelector } from "../../store/hooks"
import _ from "lodash"

const DoesntExistError = ({id}: {id: string}) => {
  return <GridItem bg="red.300" colStart={1} colEnd={9}>
    ERROR: {id} doesn't exist
  </GridItem>
}

export function TableRow(props: { bg: string, expanded: boolean, id: string }) {
  const current = useAppSelector(({table}) => _.find(table.workingCopy, {id: props.id}))
  const saved = useAppSelector(({table}) => _.find(table.people, {id: props.id}))

  if (!current) {
    return <DoesntExistError id={props.id} />
  }

  const signInDate = DateTime.fromISO(current.signInDate).toFormat("dd. MM. yyyy hh:mm")
  const payTillDate = DateTime.fromISO(current.payTillDate).toFormat("dd. MM. yyyy")
  const paidDate = current.paidDate
    ? DateTime.fromISO(current.paidDate).toFormat("dd. MM. yyyy")
    : "...nothing"

  const [splitHeight, setSplitHeight] = useState("100%")
  const splitExampleRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch()

  // TODO: Fix this horrible hack
  function refreshSplitHeight() {
    if (!splitExampleRef.current) return
    const computedStyle = window.getComputedStyle(splitExampleRef.current)
    setSplitHeight(computedStyle.height)
  }

  useLayoutEffect(refreshSplitHeight)

  const CellBg = props.bg

  interface CellProps extends GridItemProps {
    bold?: boolean;
    gray?: boolean;
    small?: boolean;
    input?: boolean; // TODO: Change to its own element
    keyDb?: keyof Person
    ref?: MutableRefObject<any>
  }

  const Cell = (props: PropsWithChildren<CellProps>) => {
    const normal = "inherit"
    const gray = "gray"

    const [insideValue, setInsideValue] = useState(current[props.keyDb!]!)
    const [temporaryValue, setTemporaryValue] = useState(insideValue)

    function onChange(e: ChangeEvent<HTMLInputElement>) {
      setTemporaryValue(e.target.value)
    }

    function onBlur(e: FocusEvent<HTMLInputElement>) {
      setInsideValue(temporaryValue)
      // const payload = {property: props.keyDb!, id: current!.id, value: insideValue!}
      // dispatch(setProperty(payload))
    }

    const edited = !(saved![props.keyDb!]! === insideValue)

    const inside = props.input
      ? <Input value={temporaryValue} type="text"
               p="0" m="0" pl="1ex"
               color="inherit" bg={edited ? TableCellEdited : "inherit"}
               w="100%" h="100%"
               display="inline-grid" justifyContent="center" alignItems="center"
               fontWeight="inherit" fontSize="inherit" fontFamily="inherit"
               ref={splitExampleRef} // TODO: Why does this even work?

               onChange={onChange}
               onBlur={onBlur}

               borderRadius="0" border="none" />
      : props.children

    const justifyAlign = props.input ? "stretch" : "center"

    return <GridItem fontSize={props.small ? "11px" : "13px"}
                     display="grid" justifyContent={justifyAlign} alignContent={justifyAlign}
                     fontWeight={props.bold ? "bold" : "normal"}
                     flexGrow={1}
                     bg={CellBg}
                     color={props.gray ? gray : normal}
                     {...props}>
      {inside}
    </GridItem>
  }

  return <>
    <Cell colStart={1} bold fontSize="14px" keyDb="id">
      {current.personalId}
    </Cell>
    <VerticalSplit gridColumn={2} h="100%">
      <HorizontalSplit cols="1fr 1fr">
        <Cell bold h={splitHeight} input keyDb="applicantName" />
        <Cell bold input keyDb="applicantSurname" />
      </HorizontalSplit>
      <HorizontalSplit cols="1fr 1fr">
        <Cell input keyDb="parentName" />
        <Cell input keyDb="parentSurname" />
      </HorizontalSplit>
    </VerticalSplit>
    <VerticalSplit gridColumn={3}>
      <Cell bold gray input keyDb="schoolName" />
      <HorizontalSplit cols="4fr 7fr 4fr">
        <Cell bold input keyDb="phone" />
        <Cell bold input keyDb="parentEmail" ref={splitExampleRef} />
        <Cell bold gray keyDb="ip">{current.ip}</Cell>
      </HorizontalSplit>
    </VerticalSplit>
    <Cell colStart={4} bold keyDb="variableSymbol">
      {current.variableSymbol}
    </Cell>
    <Cell colStart={5} bold gray small>
      {signInDate}
    </Cell>
    <Cell colStart={6} bold small>
      {payTillDate}
    </Cell>
    <Cell colStart={7} bold small>
      {paidDate}
    </Cell>
    <Cell colStart={8} bold overflow="hidden">
      <Button bg="rgb(185, 28, 28)" rounded="0.25rem" h="100%" w="100%"
              display="flex" justifyContent="center" alignItems="center"
              p="3px">
        <Email color="white" />
      </Button>
    </Cell>
    <Cell colStart={9} overflow="hidden">
      <Button h="100%" w="100%" bg="transparent" _focus={{ border: "none" }}>
        <Settings color="black" />
      </Button>
    </Cell>
    {/*
    <Cell colStart={2} colEnd={12} fontStyle="italic">Platba přijde o den později</Cell>
*/}
  </>
}
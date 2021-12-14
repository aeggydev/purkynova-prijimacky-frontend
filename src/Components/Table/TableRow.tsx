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

export function TableRow(props: { person: Person, bg: string, expanded: boolean }) {
  const signInDate = DateTime.fromISO(props.person.signInDate).toFormat("dd. MM. yyyy hh:mm")
  const payTillDate = DateTime.fromISO(props.person.payTillDate).toFormat("dd. MM. yyyy")
  const paidDate = props.person.paidDate
    ? DateTime.fromISO(props.person.paidDate).toFormat("dd. MM. yyyy")
    : "...nothing"

  const [splitHeight, setSplitHeight] = useState("100%")
  const splitExampleRef = useRef<HTMLInputElement>(null)

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
    inputStr?: string
    ref?: MutableRefObject<any>
  }

  const Cell = (props: PropsWithChildren<CellProps>) => {
    const normal = "inherit"
    const gray = "gray"

    const [insideValue, setInsideValue] = useState(props.inputStr)
    const [temporaryValue, setTemporaryValue] = useState(insideValue)

    function onChange(e: ChangeEvent<HTMLInputElement>) {
      setTemporaryValue(e.target.value)
    }

    function onBlur(e: FocusEvent<HTMLInputElement>) {
      setInsideValue(temporaryValue)
    }
    const edited = !(props.inputStr === insideValue)

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
    <Cell colStart={1} bold fontSize="14px">
      {props.person.personalId}
    </Cell>
    <VerticalSplit gridColumn={2} h="100%">
      <HorizontalSplit cols="1fr 1fr">
        <Cell bold h={splitHeight} input inputStr={props.person.applicantName}>{props.person.applicantName}</Cell>
        <Cell bold input inputStr={props.person.applicantSurname}>{props.person.applicantSurname}</Cell>
      </HorizontalSplit>
      <HorizontalSplit cols="1fr 1fr">
        <Cell input inputStr={props.person.parentName}>{props.person.parentName}</Cell>
        <Cell input inputStr={props.person.parentSurname}>{props.person.parentSurname}</Cell>
      </HorizontalSplit>
    </VerticalSplit>
    <VerticalSplit gridColumn={3}>
      <Cell bold gray input inputStr={props.person.schoolName}>{props.person.schoolName}</Cell>
      <HorizontalSplit cols="4fr 7fr 4fr">
        <Cell bold input inputStr={props.person.phone}>{props.person.phone}</Cell>
        <Cell bold input inputStr={props.person.parentEmail}
              ref={splitExampleRef}>
          {props.person.parentEmail}
        </Cell>
        <Cell bold gray>{props.person.ip}</Cell>
      </HorizontalSplit>
    </VerticalSplit>
    <Cell colStart={4} bold>
      {props.person.variableSymbol}
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
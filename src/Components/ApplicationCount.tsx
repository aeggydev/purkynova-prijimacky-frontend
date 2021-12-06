import React from "react";
import ShadowBox from "./StyleComponents/ShadowBox";
import styled from "styled-components";

const Paragraph = styled.p`
  margin-bottom: 1em;
  font-weight: 500;
  line-height: 24px;
`

interface ApplicationCountProps {
  date: string // TODO: Change to some date object
  filled: number
  totalAmount: number
}

const DefaultProps: ApplicationCountProps = {
  date: "1. 11. 2022",
  filled: 112,
  totalAmount: 250
}

export const PureApplicationCount = ({date, filled, totalAmount}: ApplicationCountProps) => {
  return <ShadowBox py="1em">
    <Paragraph style={{marginBottom: 0}}>Přihlášky přijímáme od {date}. Kapacita je <b>{filled}/{totalAmount}</b>.</Paragraph>
  </ShadowBox>
}
export const DummyApplicationCount = () => <PureApplicationCount {...DefaultProps} />
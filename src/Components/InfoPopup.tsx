import { Box, ChakraProps, useBoolean } from "@chakra-ui/react";
import { PropsWithChildren, MouseEvent, useState } from "react";
import Info from "../Icons/Info"
import Help from "../Icons/Help"
import { FormSubmitBg } from "../theme";
import ShadowBox from "./Containers/ShadowBox";

export enum IconType {
  questionMark,
  exclamationPoint
}

interface PopupProps {
  onClose?: () => void;
  show: boolean;
  x: number;
  y: number;
}
export const InfoPopup = ({ children, show, x, y }: PropsWithChildren<PopupProps>) => {
  const remainingToRight = window.innerWidth - x
  const remainingAtLeast = window.innerWidth / 3
  const isLeftOfMouse = remainingToRight < remainingAtLeast

  const left = isLeftOfMouse
    ? x - 15 - ((window.innerWidth / 100) * 20) // Calculate 20vw
    : x + 20
  const top = y + 20

  return show ? <div style={{position: "fixed", zIndex: 1, left, top}}>
    {/* Not using Box because it generates class on every mouse movement */}

    <ShadowBox boxShadow="2xl" borderWidth="3.5px" borderColor={FormSubmitBg} // TODO: Change border color to something better
               w="20vw" p="0.75em" fontWeight="500" fontSize="14">
      {children}
    </ShadowBox>
  </div> : null;
};

interface ButtonProps extends ChakraProps {
  icon: IconType
}
export const InfoButton = (props: PropsWithChildren<ButtonProps>) => {
  const [flag, setFlag] = useBoolean()
  const [position, setPosition] = useState({x: 0, y: 0})
  function positionExtract(e: MouseEvent<HTMLDivElement>) {
    setPosition({x: e.clientX, y: e.clientY})
  }

  let Icon
  switch (props.icon) {
    case IconType.exclamationPoint:
      Icon = Info
      break
    case IconType.questionMark:
      Icon = Help
      break
  }

  const whenMissing = <span style={{color: "red"}}>ERROR: NEBYLO VYPLNĚNO</span>

  return <Box position="relative" display="grid" {...props}>
    <div style={{display: "inline-block", justifySelf: "center"}} onMouseEnter={setFlag.on} onMouseLeave={setFlag.off} onMouseMove={positionExtract}>
      <Icon color="black" />
    </div>
    <InfoPopup show={flag} x={position.x} y={position.y}>
      {props.children || whenMissing}
    </InfoPopup>
  </Box>;
};
import { Box, useBoolean } from "@chakra-ui/react";
import { PropsWithChildren, MouseEvent, useState } from "react";
import Info from "../Icons/Info";
import { FormSubmitBg } from "../theme";
import ShadowBox from "./Containers/ShadowBox";

interface PopupProps {
  onClose?: () => void;
  show: boolean;
  x: number;
  y: number;
}
export const InfoPopup = ({ children, show, x, y }: PropsWithChildren<PopupProps>) => {
  return show ? <Box position="fixed" zIndex="1" top={y + 20} left={x + 20}>
    <ShadowBox boxShadow="2xl" borderWidth="3.5px" borderColor={FormSubmitBg} // TODO: Change border color to something better
               w="20vw" p="0.75em" fontWeight="500" fontSize="14">
      {children}
    </ShadowBox>
  </Box> : null;
};

interface ButtonProps {
}
export const InfoButton = (props: ButtonProps) => {
  const [flag, setFlag] = useBoolean()
  const [position, setPosition] = useState({x: 0, y: 0})
  function positionExtract(e: MouseEvent<HTMLDivElement>) {
    setPosition({x: e.clientX, y: e.clientY})
  }

  return <Box position="relative">
    <div style={{display: "inline-block"}} onMouseEnter={setFlag.on} onMouseLeave={setFlag.off} onMouseMove={positionExtract}>
      <Info color="black" />
    </div>
    <InfoPopup show={flag} x={position.x} y={position.y}>
      Telefonní číslo je pouze sekundární forma komunikace. Je možné zadat pouze čísla s českou předvolbou +420.
    </InfoPopup>
  </Box>;
};
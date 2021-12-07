import { Box, Button } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import ShadowBox from "./Containers/ShadowBox";

interface Props {
  onClose: () => void
  show: boolean
}

const InfoPopup = ({children, onClose, show}: PropsWithChildren<Props>) => {
  return show ? <Box>
    <ShadowBox>
      <Button _focus={{boxShadow: "none"}} onClick={onClose}>x</Button>
      {children}
    </ShadowBox>
  </Box> : null
}

export default InfoPopup
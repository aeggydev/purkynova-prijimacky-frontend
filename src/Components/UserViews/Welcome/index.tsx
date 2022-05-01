import { useIsMobileTernary } from "../../../hooks/useIsMobile"
import MWelcome from "./Mobile"
import DWelcome from "./Desktop"

export default function Welcome() {
    return useIsMobileTernary(<MWelcome />, <DWelcome />)
}

import { useIsMobileTernary } from "../../../hooks/useIsMobile"
import DContact from "./Desktop"
import MContact from "./Mobile"

export default function Contact() {
    return useIsMobileTernary(<MContact />, <DContact />)
}

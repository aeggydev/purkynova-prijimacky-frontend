import { useIsMobileTernary } from "../../../hooks/useIsMobile"
import MHeader from "./Mobile"
import DHeader from "./Desktop"

export default function Header({ isAdmin }: { isAdmin: boolean }) {
    return useIsMobileTernary(<MHeader />, <DHeader isAdmin={isAdmin} />)
}

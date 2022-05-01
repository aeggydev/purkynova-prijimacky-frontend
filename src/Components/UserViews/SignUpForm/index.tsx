import { useIsMobileTernary } from "../../../hooks/useIsMobile"
import DForm from "./Desktop"
import MForm from "./Mobile"

export default function SignUpForm() {
    return useIsMobileTernary(<MForm />, <DForm />)
}

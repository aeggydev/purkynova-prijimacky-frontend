import { useIsMobileTernary } from "../../../hooks/useIsMobile"
import DForm from "./Desktop"

export default function SignUpForm() {
    return useIsMobileTernary(<DForm />, <DForm />)
}

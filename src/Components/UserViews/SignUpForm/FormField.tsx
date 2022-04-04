import { ChakraProps, Input } from "@chakra-ui/react"
import { FormContext, StateDefault } from "./Form"
import { ChangeEvent, useContext } from "react"

interface Props extends ChakraProps {
    label: string;
    fieldName: keyof typeof StateDefault;
}

const FormField = (props: Props) => {
    const [state, setState] = useContext(FormContext)
    // @ts-ignore
    const value = state[props.fieldName]

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const change = {} as any
        change[props.fieldName] = e.target.value
        // @ts-ignore
        setState({ ...state, ...change })
    }

    return <Input bg="white" shadow="md" mb="1em" placeholder={props.label}
                  value={value} onChange={onChange} />
}

export default FormField

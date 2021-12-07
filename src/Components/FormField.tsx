import { Box, ChakraProps, Input, Text } from "@chakra-ui/react";
import { FormFieldBg } from "../theme";

interface Props extends ChakraProps {
  label: string;
}

const FormField = (props: Props) => {
  return <Input bg="white" shadow="md" mb="1em" placeholder={props.label}
    {...props} />
{/*
    <Text position="absolute" zIndex="1" right="3" bottom="0"
          userSelect="none"
          textTransform="uppercase" fontWeight="500">{props.label}</Text>
*/}
};

export default FormField;
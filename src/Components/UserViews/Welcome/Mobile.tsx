import { Box, Text } from "@chakra-ui/react"
import ApplicationCount from "../Reusable/ApplicationCount"

export default function MWelcome() {
    return (
        <Box px="2em">
            <ApplicationCount />
            <Box textAlign="center" mx="1.5em" fontWeight={500}>
                <Text fontWeight={600} fontSize="1.4em" mb="2em">Přijímačky na střední školu? Bez obav.</Text>
                <Text my="1em">Připravíme Vás na CERMAT zkoušky v roce 2023.</Text>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias debitis deserunt dolore dolorum,
                    earum enim eos, expedita facilis illo inventore ipsa, ipsam nobis odio provident quam reprehenderit
                    repudiandae sequi similique.
                </Text>
            </Box>
        </Box>
    )
}

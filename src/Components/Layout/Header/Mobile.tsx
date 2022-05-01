import { Box, Flex, HStack, IconButton, Link, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import { TopbarBg } from "../../../theme"
import Sps from "../../../Icons/Sps"
import { HamburgerIcon } from "@chakra-ui/icons"
import MMenubar from "../Menubar/Mobile"

export default function MHeader() {
    const disclosure = useDisclosure()

    return <SimpleGrid columns={3} bg={TopbarBg}
                       color="white" alignItems="center"
                       px="1rem" py="0.5em">
        <Box justifySelf="start">
            <IconButton icon={<HamburgerIcon color="white" />} aria-label="Link menu"
                        onClick={disclosure.onOpen}
                        variant="unstyled" border="white solid 1px" />
        </Box>

        <HStack justifySelf="center" display="flex" alignItems="center">
            <Link href="http://sspbrno.cz" target="_blank">
                <Flex w="3em" h="0" placeItems="center" placeContent="center"><Sps color="white" /></Flex>
            </Link>
            <Text fontWeight="medium">PŘIJÍMAČKY NANEČISTO</Text>
        </HStack>
        <MMenubar disclosure={disclosure} />
    </SimpleGrid>
}

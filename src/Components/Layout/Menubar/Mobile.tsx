import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, UseDisclosureReturn, VStack } from "@chakra-ui/react"
import { TopbarBg } from "../../../theme"
import { Route, UserRoutes } from "../../../Routes"
import { NavLink } from "react-router-dom"

interface MenubarProps {
    disclosure: UseDisclosureReturn
}

export default function MMenubar({ disclosure }: MenubarProps) {
    return <Drawer
        isOpen={disclosure.isOpen}
        placement="bottom"
        onClose={disclosure.onClose}
        size="xs"
    >
        <DrawerOverlay />
        <DrawerContent maxW="65vw">
            <DrawerBody bg={TopbarBg} p={0} color="white">
                <VStack width="100%" spacing="0">
                    {UserRoutes.map((x, i) => <Item route={x} key={i} disclosure={disclosure} />)}
                </VStack>
            </DrawerBody>
        </DrawerContent>
    </Drawer>
}

interface ItemProps {
    route: Route
    disclosure: UseDisclosureReturn
}

function Item({ route, disclosure }: ItemProps) {
    return <NavLink to={route.path} onClick={disclosure.onClose} style={isActive => ({
        background: isActive ? "#46BC87" : "inherit",
        placeContent: "center",
        width: "100%",
        borderRadius: "0 25px 25px 0",
        marginRight: "25px"
    })}>
        <Flex fontSize="20px" p="0.5em" placeContent="center">
            {route.text}
        </Flex>
    </NavLink>
}

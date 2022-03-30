import * as React from "react"
// @ts-ignore
import MenuIcon from "url:/src/Icons/menu.svg"
import { NavLink } from "react-router-dom"
import { Box as ChakraBox } from "@chakra-ui/react"
import {
    LightText,
    TopbarAdminBg,
    TopbarAdminDarkBg,
    TopbarAdminLightBg,
    TopbarBg,
    TopbarDarkBg,
    TopbarLightBg
} from "../theme"
import Routes, { Route } from "../Routes"

type Props = {
    route: Route
    isAdmin: boolean
};

function MenubarItem({ route, isAdmin }: Props) {
    const bg = isAdmin ? TopbarAdminBg : TopbarBg
    const darkBg = isAdmin ? TopbarAdminDarkBg : TopbarDarkBg
    const lightBg = isAdmin ? TopbarAdminLightBg : TopbarLightBg

    return <NavLink to={route.path} style={isActive => ({
        display: "inline-block",
        background: isActive ? darkBg : bg,
        borderBottomWidth: isActive ? "4px" : "0px",
        borderBottomColor: lightBg
    })}>
        <ChakraBox as={"span"}
                   textTransform={"uppercase"} display={"inline-block"}
                   fontSize={"17px"} height={"100%"} padding={".75rem"}
                   fontWeight={"500"}>
            {route.text}
        </ChakraBox>
    </NavLink>
}

interface MenubarProps {
    isAdmin: boolean
}

function Menubar({ isAdmin }: MenubarProps) {
    const [drawerState, setDrawerState] = React.useState(false)

    const bg = isAdmin ? TopbarAdminBg : TopbarBg

    const toggleDrawer = (value?: boolean) => () => {
        if (value) {
            setDrawerState(value)
        } else {
            setDrawerState(!drawerState)
        }
    }

    return <ChakraBox background={bg} color={LightText}
                      display={"flex"} justifyContent={"center"}
                      boxSizing={"border-box"}>
        {Routes.map((x, i) => <MenubarItem isAdmin={isAdmin} route={x} key={i} />)}
    </ChakraBox>
}

export default Menubar

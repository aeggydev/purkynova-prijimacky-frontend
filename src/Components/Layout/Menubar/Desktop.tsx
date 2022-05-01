import * as React from "react"
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
} from "../../../theme"
import { AdminRoutes, Route, UserRoutes } from "../../../Routes"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"

interface MenubarProps {
    isAdmin: boolean
}

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

function DMenubar({ isAdmin }: MenubarProps) {
    const [drawerState, setDrawerState] = React.useState(false)
    const loginState = useSelector((state: RootState) => state.login)

    const bg = isAdmin ? TopbarAdminBg : TopbarBg

    const toggleDrawer = (value?: boolean) => () => {
        if (value) {
            setDrawerState(value)
        } else {
            setDrawerState(!drawerState)
        }
    }

    const routes = loginState.loggedIn
        ? AdminRoutes
        : UserRoutes

    return <ChakraBox background={bg} color={LightText}
                      display={"flex"} justifyContent={"center"}
                      boxSizing={"border-box"}>
        {routes.map((x, i) => <MenubarItem isAdmin={isAdmin} route={x} key={i} />)}
    </ChakraBox>
}

export default DMenubar

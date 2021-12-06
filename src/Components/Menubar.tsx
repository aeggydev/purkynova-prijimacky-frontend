import * as React from "react";
// @ts-ignore
import MenuIcon from "url:/src/Icons/menu.svg";
import { NavLink } from "react-router-dom";
import { Box as ChakraBox } from "@chakra-ui/react";
import { LightText, TopbarBg, TopbarDarkBg, TopbarLightBg } from "../theme";
import Routes, { Route } from "../Routes";

type Props = {
  route: Route
};

function MenubarItem({ route }: Props) {
  return <NavLink to={route.path} style={isActive => ({
    display: "inline-block",
    background: isActive ? TopbarDarkBg : TopbarBg,
    borderBottomWidth: isActive ? "4px" : "0px",
    borderBottomColor: TopbarLightBg
  })}>
    <ChakraBox as={"span"}
               textTransform={"uppercase"} display={"inline-block"}
               fontSize={"17px"} height={"100%"} padding={".75rem"}
               fontWeight={"500"}>
      {route.text}
    </ChakraBox>
  </NavLink>;
}

function Menubar() {
  const [drawerState, setDrawerState] = React.useState(false);
  const toggleDrawer = (value?: boolean) => () => {
    if (value) {
      setDrawerState(value);
    } else {
      setDrawerState(!drawerState);
    }
  };

  return <ChakraBox background={TopbarBg} color={LightText}
                    display={"flex"} justifyContent={"center"}
                    boxSizing={"border-box"}>
    {Routes.map((x, i) => <MenubarItem route={x} key={i} />)}
  </ChakraBox>;
}

export default Menubar;

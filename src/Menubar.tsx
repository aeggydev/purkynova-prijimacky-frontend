import MenubarItem from "./MenubarButton"
import { Drawer, Box, List, ListItemButton } from "@mui/material"
import * as React from "react"
import MenuIcon from "url:/src/icons/menu.svg";
//import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

const menuItems = [["Hlavní stránka", "/main"], ["Dashboard", "/dashboard"], ["Elektronická přihláška", "/form"], ["Kontakt", "/contact"]]

function Menubar() {
    const [drawerState, setDrawerState] = React.useState(false)
    const toggleDrawer = (value?: boolean) => () => {
      if (value) {
        setDrawerState(value)
      } else {
        setDrawerState(!drawerState)
      }
    }

    const list = () => (
      <Box onClick={toggleDrawer(false)} role="presentation" sx={{width: 250}}>
        <List>
          {menuItems.map((text, index) => <ListItemButton key={index}><Link to={text[1]}>{text[0]}</Link></ListItemButton>)}
        </List>
      </Box>
    )

    return <div style={{marginBottom: "0.5rem"}}>
        <div>
          <button onClick={toggleDrawer()}>
            <img src={MenuIcon} alt="Menu icon" />
          </button>
          <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </div>
{/*
        <div className="hidden px-2 mx-2 navbar-center md:flex">
            <div className="flex items-stretch">
              {menuItems.map(x => <Link to={x[1]}>
                  <MenubarItem title={x[0]} />
                </Link>)}
            </div>
        </div>
*/}
        <div />
  </div>
}

export default Menubar
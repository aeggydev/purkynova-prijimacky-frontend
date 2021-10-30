import "./styles/output.css"
import MenubarItem from "./MenubarButton"
import { Drawer, Box, List, ListItemButton } from "@mui/material"
import * as React from "react"
import MenuIcon from '@mui/icons-material/Menu';
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

    return <div className="navbar mb-2 shadow-lg bg-green-600 text-neutral-content px-6">
        <div className="navbar-start">
          <button onClick={toggleDrawer()} className="md:hidden block">
            <MenuIcon />
          </button>
          <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </div>
        <div className="hidden px-2 mx-2 navbar-center md:flex">
            <div className="flex items-stretch">
              {menuItems.map(x => <Link to={x[1]}>
                  <MenubarItem title={x[0]} />
                </Link>)}
            </div>
        </div>
        <div className="navbar-end" />
  </div>
}

export default Menubar
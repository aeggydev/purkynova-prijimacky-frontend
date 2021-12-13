// @ts-ignore
import spsLogo from "url:/src/Icons/sspbrno.png"
import React from "react"
import { LightText, TopbarBg } from "../theme"
import Menubar from "./Menubar"
import { Box } from "@chakra-ui/react"

function Header() {
  return (
    <Box background={TopbarBg} color={LightText}>
      <a
        href="http://sspbrno.cz"
        target="_blank"
        rel="noreferrer"
        style={{
          width: "100%", height: "8rem", background: TopbarBg, boxSizing: "border-box",
          alignItems: "center", display: "flex", flexDirection: "row", padding: "0 9rem"
        }}
      >
        <img
          src={spsLogo}
          alt="Logo školy"
          style={{ height: "auto", width: "auto", maxHeight: "5rem" }}
        />
        <div style={{ marginLeft: "3rem", display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "1.25rem", lineHeight: "1.75rem", marginBottom: "0.125rem", display: "block" }}>
          Střední průmyslová škola Brno, Purkyňova, příspěvková organizace
        </span>
          <span style={{ fontSize: "1.5rem", lineHeight: "2rem" }}>PŘÍJMAČKY NANEČISTO</span>
        </div>
      </a>
      <Menubar />
    </Box>
  )
}

export default Header

// @ts-ignore
import spsLogo from "url:/src/Icons/sspbrno.png"
import React from "react"
import { LightText, TopbarAdminBg, TopbarBg } from "../../theme"
import Menubar from "./Menubar"
import { Box, Link } from "@chakra-ui/react"
import Sps from "../../Icons/Sps"

interface HeaderProps {
    isAdmin: boolean
}

function Header({ isAdmin }: HeaderProps) {
    const bg = isAdmin ? TopbarAdminBg : TopbarBg

    const AdminMode = <Box position="absolute" top="10px" right="50px" color={LightText}>ADMIN</Box>
    return (
        <Box background={bg} color={LightText}>
            <Box w="100%" h="8rem" bg={bg} boxSizing="border-box"
                 alignItems="center"
                 position="relative"
                 display="flex" flexDir="row"
                 p="0 9rem">
                <Link href="http://sspbrno.cz"
                      target="_blank"
                      rel="noreferrer"
                      w="94px"
                      display="flex">
                    <Sps color="white" />
                </Link>
                <Box ml="3rem" d="flex" flexDir="column">
                    <Box fontSize="1.25rem" lineHeight="1.75rem" mb="0.125rem" d="block">
                        Střední průmyslová škola Brno, Purkyňova, příspěvková organizace
                    </Box>
                    <Box as="span" fontSize="1.5rem" lineHeight="2rem">PŘÍJMAČKY NANEČISTO</Box>
                </Box>
                {isAdmin ? AdminMode : ""}
            </Box>
            <Menubar isAdmin={isAdmin} />
        </Box>
    )
}

export default Header

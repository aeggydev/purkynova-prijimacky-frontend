import { Flex, Link, Text } from "@chakra-ui/react"
import React from "react"
import ShadowC from "../../Containers/ShadowBox"
import Container from "../../Containers/ContentContainer"

function DContact() {
    return <Container>
        <ShadowC textAlign="left" display="grid" mx="5%">
            <Text fontWeight="900" mb="1em">Kontaktní osoba</Text>
            <Text fontWeight="500">Alena Klobásová<br />
                tel. 541 649 193<br />
                <Link href="mailto:alena.klobasova@sspbrno.cz"
                      textDecoration="underline">alena.klobasova@sspbrno.cz</Link>
            </Text>
            <Text fontWeight="900" my="1em">Organizátor akce</Text>
            <Text fontWeight="500">Střední průmyslová škola Brno, Purkyňova, příspěvková organizace<br />
                Purkyňova 97, 612 00 Brno<br />
                <Link href="http://sspbrno.cz" target="_blank" textDecoration="underline">www.sspbrno.cz</Link></Text>
            <Flex mt="1.5em" placeContent="center">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d614.8651252276952!2d16.580744882153386!3d49.22507427447071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47129403c69be65b%3A0xd9c7d91a683162ab!2zU3TFmWVkbsOtIHByxa9teXNsb3bDoSDFoWtvbGEgQnJubywgUHVya3nFiG92YSwgcMWZw61zcMSbdmtvdsOhIG9yZ2FuaXphY2U!5e0!3m2!1sen!2scz!4v1651399468749!5m2!1sen!2scz"
                    width="700" height="450" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" />
            </Flex>
        </ShadowC>
    </Container>
}

export default DContact

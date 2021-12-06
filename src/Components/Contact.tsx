import { Link, Text } from "@chakra-ui/react";
import React from "react";
import ShadowC from "./StyleComponents/ShadowBox";
import Container from "./StyleComponents/ContentContainer"

function Contact() {
  return <Container>
    <ShadowC textAlign="left" display="grid" mx="5%">
      <Text fontWeight="900" mb="1em">Kontaktní osoba</Text>
      <Text fontWeight="500">Alena Klobásová<br />
        tel. 541 649 193<br />
        <Link href="mailto:alena.klobasova@sspbrno.cz" textDecoration="underline">alena.klobasova@sspbrno.cz</Link>
      </Text>
      <Text fontWeight="900" my="1em">Organizátor akce</Text>
      <Text fontWeight="500">Střední průmyslová škola Brno, Purkyňova, příspěvková organizace<br />
        Purkyňova 97, 612 00 Brno<br />
        <Link href="http://sspbrno.cz" target="_blank" textDecoration="underline">www.sspbrno.cz</Link></Text>
      <iframe src="https://en.frame.mapy.cz/s/jefujozome" frameBorder="0"
              width="700" height="333"
              style={{border: "none", justifySelf: "center", marginTop: "1.5em"}} />
    </ShadowC>
  </Container>
}

export default Contact;

import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

function Contact() {
  return <Box>
    <Text fontWeight="900" mb="1em">Kontaktní osoba</Text>
    <Text fontWeight="500">Alena Klobásová<br />
      tel. 541 649 193<br />
      <Link href="mailto:alena.klobasova@sspbrno.cz" textDecoration="underline">alena.klobasova@sspbrno.cz</Link>
    </Text>
    <Text fontWeight="900" my="1em">Organizátor akce</Text>
    <Text fontWeight="500">Střední průmyslová škola Brno, Purkyňova, příspěvková organizace<br />
      Purkyňova 97, 612 00 Brno<br />
      <Link href="http://sspbrno.cz" target="_blank" textDecoration="underline">www.sspbrno.cz</Link></Text>
  </Box>;
}

export default Contact;

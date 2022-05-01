import { Box, Flex, Link, Text } from "@chakra-ui/react"

export default function MContact() {
    return <Box m="1.5em">
        <p>
            <Text textAlign="center" fontWeight="semibold" mb="1ex">Kontaktní osoba</Text>
            <Text>Alena Klobásová</Text>
            <Text>tel. 541 649 193</Text>
            <Link textDecoration="underline" href="mailto:alena.klobasova@sspbrno.cz">
                alena.klobasova@sspbrno.cz
            </Link>
        </p>
        <p>
            <Text textAlign="center" fontWeight="semibold" my="1ex">Organizátor akce</Text>
            <Text>Střední průmyslová škola Brno, Purkyňova, příspěvková organizace</Text>
            <Text>Purkyňova 97, 612 00 Brno</Text>
            <Link textDecoration="underline" href="http://sspbrno.cz" target="_blank">
                http://sspbrno.cz
            </Link>
        </p>
        <Flex mt="1em">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d614.8651252276952!2d16.580744882153386!3d49.22507427447071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47129403c69be65b%3A0xd9c7d91a683162ab!2zU3TFmWVkbsOtIHByxa9teXNsb3bDoSDFoWtvbGEgQnJubywgUHVya3nFiG92YSwgcMWZw61zcMSbdmtvdsOhIG9yZ2FuaXphY2U!5e0!3m2!1sen!2scz!4v1651399468749!5m2!1sen!2scz"
                width="600" height="450" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
        </Flex>
    </Box>
}

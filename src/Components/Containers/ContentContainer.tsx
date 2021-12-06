import { Box, Text, Grid } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { GrayText } from "../../theme";
import AdminButton from "../AdminButton";

export default ({ children }: PropsWithChildren<{}>) => {
  return <Box mt="2.5%" display="grid">
    <Box pb="1%" px="7em" mx="3%">
      {children}
    </Box>
    <Grid templateColumns="1fr 1fr 1fr">
      <Text color={GrayText} gridColumn="2">© Střední průmyslová škola Brno, Purkyňova, příspěvková
        organizace</Text>
      <AdminButton gridColumn="3" justifySelf="end" />
    </Grid>
  </Box>;
}
import React, { PropsWithChildren } from "react"
import { Box, ChakraProps, Grid } from "@chakra-ui/react"

export const VerticalSplit = (props: PropsWithChildren<ChakraProps>) => (
  <Grid display="flex" flexDirection="column" {...props}>
    {props.children}
  </Grid>
)

export interface HorizontalSplitProps extends ChakraProps {
  cols: string;
}

export const HorizontalSplit = (props: PropsWithChildren<HorizontalSplitProps>) => (
  <Box display="grid" gridAutoFlow="column" gridTemplateColumns={props.cols}
       {...props}>
    {props.children}
  </Box>
)
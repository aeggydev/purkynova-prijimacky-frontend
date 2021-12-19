import React from "react"
import ContentContainer from "../Containers/ContentContainer"
import ShadowBox from "../Containers/ShadowBox"
import { ChakraProps } from "@chakra-ui/react"
import { Table } from "../Table/Table"

export function Dashboard() {
  const insideProps: ChakraProps = {
    px: "0",
    mx: "0"
  }
  return <ContentContainer insideBox={insideProps}>
      <Table />
  </ContentContainer>

  /*
      const { loading, error, data } = useGetPeopleQuery()

      if (loading) return <p>"Loading... (TODO)"</p>
      if (error) return <p>`Error... (${error.message}) TODO`</p>

      return <div>
          <Table people={data!.people} />
      </div>
  */
}
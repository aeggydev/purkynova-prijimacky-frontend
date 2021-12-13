import { Table } from "../Table"
import { useGetPeopleQuery } from "../../graphql/types";
import React from "react"
import ContentContainer from "../Containers/ContentContainer";
import ShadowBox from "../Containers/ShadowBox";
import { PeopleTest } from "../../Types/Person";
import { ChakraProps } from "@chakra-ui/react";

export function Dashboard() {
    const insideProps: ChakraProps = {
        px: "2em",
        mx: "0"
    }
    return <ContentContainer insideBox={insideProps}>
        <ShadowBox px="1em" py="1em">
            <Table people={PeopleTest} />
        </ShadowBox>
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
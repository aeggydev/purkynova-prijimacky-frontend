import { Table } from "../Table"
import { useGetPeopleQuery } from "../../graphql/types";
import React from "react"
import ContentContainer from "../Containers/ContentContainer";
import ShadowBox from "../Containers/ShadowBox";

export function Dashboard() {
    return <ContentContainer>
        <ShadowBox>
            TO BE DONE
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
import { Table } from "./Table"
import { useGetPeopleQuery } from "./graphql/types";
import React from "react"

export function Dashboard() {
    const { loading, error, data } = useGetPeopleQuery()

    if (loading) return <p>"Loading... (TODO)"</p>
    if (error) return <p>`Error... (${error.message}) TODO`</p>

    return <div>
        <Table people={data!.people} />
    </div>
}
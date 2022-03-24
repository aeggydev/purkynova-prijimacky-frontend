import { Participant } from "../../graphql/graphql"
import React, { PropsWithChildren, useContext, useState } from "react"

type ContextType = { participant: Participant }
const RowContext = React.createContext<ContextType>({} as ContextType)

export function TableRow({ i, participant }: { i: number, participant: Participant }) {
    const [context, setContext] = useState<ContextType>({ participant })

    return <RowContext.Provider value={context}>
        <tr>
            <BindCell index="id" />
            <BindCell index="participantName" />
            <BindCell index="participantSurname" />
            <BindCell index="parentName" />
            <BindCell index="parentSurname" />
            <BindCell index="email" />
            <BindCell index="phone" />
            <BindCell index="school" />
            <BindCell index="ip" changeable={false} />
            <BindCell index="variableSymbol" changeable={false} />

            <BindCell index="signUpDate" changeable={false} />
            <BindCell index="dueDate" changeable={false} />
            <BindCell index="paidDate" changeable={false} />
        </tr>
    </RowContext.Provider>
}

export function BindCell({ index, changeable = true }: { index: keyof Participant, changeable?: boolean }) {
    const context = useContext(RowContext)
    const participant = context.participant

    return <Cell>{participant[index]}</Cell>
}

export function Cell({ children }: PropsWithChildren<{}>) {
    return <td>{children}</td>
}

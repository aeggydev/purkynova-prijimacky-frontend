import { useContext, useEffect, useState } from "react"
import { RowContext } from "../Components/AdminViews/Dashboard/Table/TableRow"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Participant } from "../graphql/graphql"
import { usePrevious } from "./usePrevious"
import { setProperty } from "../store/table"

// Has to be run under a RowContext
export function useTableCell(index: keyof Participant) {
    // Get the static participant (from Apollo)
    const { participant: staticParticipant } = useContext(RowContext)
    const id = staticParticipant.id // Id of participant
    const staticValue = staticParticipant[index] // Value of original property
    // Get the changes saved in Redux
    const changes = useSelector((state: RootState) => state.table.changes)
    // Get the Dispatch function from Redux (used for mutating the changes state)
    const dispatch = useDispatch()

    // Get the possible change stored in Redux
    const changesValue = changes[id]?.[index]
    // Value from the last time useTableCell was run
    const previousChangesValue = usePrevious(changesValue)

    const [localValue, setLocalValue] = useState(staticValue) // Store changes made in component
    const edited = localValue != staticValue // Shows if any changes were made

    useEffect(() => {
        if (changesValue) setLocalValue(changesValue) // Set component state to the change in store
        else if (previousChangesValue && !changesValue) {
            setLocalValue(staticValue)
            // Change was deleted from the store (cleared table)
        }
    }, [changes])

    function storeChange(value: string | null) {
        if (!edited) return
        dispatch(setProperty({ prop: index, id, value }))
    }

    return { localValue, setLocalValue, staticValue, storeChange, edited, staticParticipant }
}

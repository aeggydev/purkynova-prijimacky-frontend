import { Participant } from "../graphql/graphql"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type StateParticipant = Omit<Participant, "__typename">
interface TableState {
    changes: { [id: number]: Partial<StateParticipant> }
}

const initialState: TableState = { changes: {} }

export const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        clear: (state) => ({ changes: {} }),
        setProperty(state, action: PayloadAction<{ id: number, prop: keyof StateParticipant, value: string | null }>) {
            const payload = action.payload
            if (!state.changes[payload.id]) state.changes[payload.id] = {}

            state.changes[payload.id][payload.prop] = payload.value
        }
    }
})

export const { clear, setProperty } = tableSlice.actions
export default tableSlice.reducer

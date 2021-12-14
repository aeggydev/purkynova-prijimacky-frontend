import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PeopleTest, Person } from "../Types/Person"

export interface TableState {
  people: Person[],
  sortLowestToHighest: boolean
  sortKey: keyof Person
}

const initialState: TableState = {
  people: PeopleTest,
  sortLowestToHighest: true,
  sortKey: "id"
}

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<keyof Person>) => {
      state.sortKey = action.payload
    },
    setSortLowestToHighest: (state, action: PayloadAction<boolean>) => {
      state.sortLowestToHighest = action.payload
    },
    flipLowestToHighest: (state) => {
      state.sortLowestToHighest = !state.sortLowestToHighest
    }
  }
})

// Action creators are generated for each case reducer function
export const {flipLowestToHighest, setSortLowestToHighest, setKey} = tableSlice.actions

export default tableSlice.reducer

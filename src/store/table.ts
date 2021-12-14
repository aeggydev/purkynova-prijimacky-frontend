import { createSlice } from "@reduxjs/toolkit"
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
  reducers: {}
})

// Action creators are generated for each case reducer function
export const {} = tableSlice.actions

export default tableSlice.reducer

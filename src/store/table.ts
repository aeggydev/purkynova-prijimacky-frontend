import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PeopleTest, Person } from "../Types/Person"
import _ from "lodash"

type Data = Person[]

export interface TableState {
  people: Data,
  workingCopy: Data
  sortLowestToHighest: boolean
  sortKey: keyof Person
}

const initialState: TableState = {
  people: PeopleTest,
  workingCopy: PeopleTest,
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
    },

    setProperty: (state, action: PayloadAction<{ id: string, property: keyof Person, value: string }>) => {
      throw new Error("not implemented")
    }
  }
})

// Action creators are generated for each case reducer function
export const { flipLowestToHighest, setSortLowestToHighest, setKey, setProperty } = tableSlice.actions

export default tableSlice.reducer
